const mapObject = (keys, value) => {
    const obj = {}
    for (const key of keys) {
        obj[key] = typeof value === 'function' ? value(key) : value
    }
    return obj
}

const toInfo = proto => name => ({
    name,
    desc: Object.getOwnPropertyDescriptor(proto, name)
})

const hasGetter = ({ desc }) => desc.get != null

const getName = ({ name }) => name

const listGetters = proto => {
    const lookup = Object.create(null)
    while (proto != null && proto !== Object.prototype) {
        const getters = Object.getOwnPropertyNames(proto)
            .filter(elem => elem !== 'constructor')
            .map(toInfo(proto))
            .filter(hasGetter)
            .map(getName)
        for (const name of getters) {
            lookup[name] = true
        }
        proto = Object.getPrototypeOf(proto)
    }
    return Object.keys(lookup)
}

const convertElement = el => '' + el

const convertTimeRanges = ranges => ({
    $type: 'TimeRanges',
    data: [...Array(ranges.length).keys()].map(i => ({
        start: ranges.start(i),
        end: ranges.end(i)
    }))
})

const convertArrayLike = type => (obj, seen) => ({
    $type: type,
    data: Array.prototype.map.call(obj, e => circularToJSON(e, seen))
})

const propertiesToJSON = (o, names, seen) =>
    mapObject(names, name => {
        let value, ok
        try {
            value = o[name]
            ok = true
        } catch (err) {
            value = err
            ok = false
        }
        return ok ? circularToJSON(value, seen) : `[Error: ${value}]`
    })

const converters = [
    { test: o => o == null, convert: () => null },
    { test: o => typeof o !== 'object', convert: o => o },
    {
        test: Array.isArray,
        convert: (a, seen) => a.map(e => circularToJSON(e, seen))
    },
    { test: o => typeof o.nodeName === 'string', convert: convertElement },
    { test: o => o instanceof window.TimeRanges, convert: convertTimeRanges },
    {
        test: o => o instanceof window.TextTrackList,
        convert: convertArrayLike('TextTrackList')
    },
    {
        test: o => o.$type === 'SortedList',
        convert: (o, seen) => circularToJSON(o.toArray(), seen)
    },
    {
        test: o =>
            o.constructor != null && o.constructor.prototype !== Object.prototype,
        convert: (o, seen) =>
            propertiesToJSON(o, listGetters(o.constructor.prototype), seen)
    },
    {
        test: () => true,
        convert: (o, seen) => propertiesToJSON(o, Object.keys(o), seen)
    }
]

const circularToJSON = (value, seen) => {
    // TODO Identify circular refs
    if (seen.includes(value)) {
        return '[Circular]'
    }
    seen.push(value)
    const idx = seen.length - 1
    const json = converters.reduce(
        (res, { test, convert }) =>
            !res.ok && test(res.value)
                ? { ok: true, value: convert(res.value, seen) }
                : res,
        {
            ok: false,
            value
        }
    ).value
    seen.splice(idx, 1)
    return json
}

const toJSON = value => circularToJSON(value, [])

const removeKey = (obj, key) => {
    if (obj == null) {
        return
    }
    if (Array.isArray(obj)) {
        for (const entry of obj) {
            removeKey(entry, key)
        }
        return
    }
    if (typeof obj === 'object') {
        delete obj[key]
        for (const value of Object.values(obj)) {
            removeKey(value, key)
        }
    }
}

const xmlToJSON = elem => {
    const json = toJSON(elem)
    removeKey(json, 'xmlElement')
    return json
}

export default xmlToJSON;