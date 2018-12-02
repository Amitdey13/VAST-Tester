import React from 'react'
import { connect } from 'react-redux'
import JSONTree from '../components/JSONTree'
import Collapsible from '../components/Collapsible'
import KeyValue from '../components/KeyValue'
import replaceKey from '../../common/util/replaceKey'

const TYPE = Symbol('type')

const renderItem = (type, data, itemType, itemString) => (
  <span>
    {data != null && data[TYPE] != null
      ? data[TYPE]
      : type === 'Array' ? itemString : itemType}
  </span>
)

const VastTagOutline = ({ vast }) => (
  <div className='vast'>
    <JSONTree data={vast} getItemString={renderItem} />
  </div>
)

const VastDetails = React.memo(({ eventCounts, chain, mediaFileUrl }) => (
  <div className='vast-details'>
    <Collapsible trigger='VAST Tag'>
      <div className='vast-info'>
        <KeyValue
          data={{
            URL: chain[0].uri
          }}
        />
      </div>
    </Collapsible>
    <Collapsible trigger='VAST Events'>
      <div className='events'>
        <KeyValue data={eventCounts} />
      </div>
    </Collapsible>
    <Collapsible trigger='VAST Chain'>
      <div className='vast-chain'>
        {chain.map((vast, i) => <VastTagOutline vast={vast} key={i} />)}
      </div>
    </Collapsible>
  </div>
))

const mapStateToProps = ({ vast: { eventCounts, chain, mediaFile } }) => ({
  eventCounts,
  chain: replaceKey(chain, '$type', TYPE)
})

export default connect(mapStateToProps)(VastDetails)
