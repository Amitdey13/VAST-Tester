import { VASTLoader } from 'iab-vast-loader';
import xmlToJSON from './toJSON';

let jsonInline = null;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('vastForm');
    const logOutput = document.getElementById('logOutput');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const vastUrl = document.getElementById('vastUrl').value;

        if (vastUrl) {
            try {
                const loader = await new VASTLoader(vastUrl, { noSingleAdPods: true }).load();
                const wrapperVasts = loader.slice(0, loader.length - 1)
                const wrappers = wrapperVasts.map(getAdFromVast('Wrapper', warn))
                const inLineVast = loader[loader.length - 1]
                const inLine = getAdFromVast('InLine', warn)(inLineVast)
                const linear = getLinearFromInLine(inLine, warn);
                const events = getTrackingEventsFromLinear(linear);
                const jsonEvents = xmlToJSON(getTrackingEventsFromLinear(linear));
                const jsonVast = xmlToJSON(loader);
                jsonInline = xmlToJSON(inLine);
                const jsonLinear = xmlToJSON(linear);
                const mediaFile = jsonLinear.mediaFiles[0];
                // console.log(jsonVast);
                console.log({jsonInline});
                // console.log(events);
                const visualAudioAddSlot = document.getElementById('visualAudioAddSlot');
                if (mediaFile.type.includes('audio')) {
                    const divElement = document.createElement('div');
                    const audioElement = document.createElement('audio');
                    audioElement.src = mediaFile.uri;
                    audioElement.id = 'visualAudioAddAudioElement';
                    // audioElement.controls = true;
                    const playBtn = document.createElement('button');
                    playBtn.id = 'visualAudioPlayBtn';
                    playBtn.textContent = 'Play';
                    playBtn.addEventListener('click', function () {
                        if (audioElement.paused) {
                            audioElement.play();
                            playBtn.textContent = 'Pause';
                        } else {
                            audioElement.pause();
                            playBtn.textContent = 'Play';
                        }
                    });
                    divElement.appendChild(audioElement);
                    divElement.appendChild(playBtn);
                    visualAudioAddSlot.appendChild(divElement);
                } else {
                    const viceoEle = createVideoElement(mediaFile);
                    visualAudioAddSlot.appendChild(viceoEle);
                }
                // visualAudioAddSlot.innerHTML = JSON.stringify(xmlToJSON(loader));
            } catch (error) {
                console.error(error);
            }
        }
    });
});

function logEvents(type, url) {
    const logList = document.getElementById("visualLog");
    const logEle = document.createElement('li');
    logEle.innerHTML = `Event: ${type}`;
    const logEleUrl = document.createElement('li');
    logEle.innerHTML = `${type}: ${url}`;
    fetch(url);
    logList.appendChild(logEle);
    logList.appendChild(logEleUrl);
}

const warn = (message, data) => console.warn({ message, data });

const getAdFromVast = (type, warn) => vast => {
    if (vast.version >= '4.0') {
        warn('Support for VAST 4 is incomplete', vast.uri)
    }
    if (vast.adPod != null) {
        warn('Ad pods not supported yet', vast.uri)
    }
    const ads = vast.ads.toArray().filter(ad => ad.$type === type)
    if (ads.length === 0) {
        throw new Error('VAST does not contain ad buffet')
    }
    if (ads.length > 1) {
        warn(`Multiple ${type} elements in VAST, using first`, vast.uri)
    }
    return ads[0]
}

const getLinearFromInLine = (inLine, warn) => {
    const linearCreatives = inLine.creatives
        .toArray()
        .filter(creative => creative.linear != null)
    if (linearCreatives.length > 1) {
        warn('Multiple Linear elements in InLine, using first', inLine.uri)
    }
    return linearCreatives[0].linear
}

const getTrackingEventsFromLinear = linear => {
    if (linear.trackingEvents == null) {
        return {}
    }

    return linear.trackingEvents.types.reduce(
        (acc, type) => ({
            ...acc,
            [type]: linear.trackingEvents.get(type)
        }),
        {}
    )
}

const createVideoElement = (mediaFile) => {
    const divElement = document.createElement('div');
    divElement.className = "visual-audio-video-container";
    divElement.style.width = `${mediaFile.width}px`;
    divElement.style.height = `${mediaFile.height}px`;
    const videoElement = document.createElement('video');
    videoElement.src = mediaFile.uri;
    // videoElement.controls = true;
    videoElement.id = 'visualAudioAddVideoContainer';
    const playBtn = document.createElement('button');
    playBtn.id = 'visualAudioPlayBtn';
    playBtn.className = "visual-audio-play-pause-btn";
    playBtn.innerHTML = "&#9658;"
    playBtn.addEventListener('click', function () {
        if (videoElement.paused) {
            videoElement.play();
            playBtn.innerHTML = '&#10074; &#10074;';
        } else {
            videoElement.pause();
            playBtn.innerHTML = "&#9658;"
        }
    });
    divElement.appendChild(videoElement);
    divElement.appendChild(playBtn);
    const impression = jsonInline.impressions[0]
    videoElement.onload = logEvents(impression.$type, impression.uri);
    return divElement;
}