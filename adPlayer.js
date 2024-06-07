async function getAndRunCustomVast() {
    console.log('getAndRunCustomVast');
    const parentElement = document.currentScript.parentNode;
    const adSlot = document.createElement('div');
    adSlot.id = 'visual_audio_slot';
    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://visual-audio.s3.amazonaws.com/dist/visualAudioVastPlayer.js';
    scriptTag.type = 'type/javascript';
    parentElement.appendChild(adSlot);
    parentElement.appendChild(scriptTag);

    const payload = {
        audio_vast_xml: `<VAST version="4.1">
        <Ad id="va-vast-1">
        <InLine>
        <AdSystem>Sample Ad System</AdSystem>
        <AdTitle>Sample Linear Audio Ad</AdTitle>
        <Description>
        <![CDATA[ Test adTag for Audio Linear Ad ]]>
        </Description>
        <Category>IAB1-1</Category>
        <Category>IAB1-5</Category>
        <Category>IAB11-4</Category>
        <Impression>
        <![CDATA[ https://ywvvk4z447ggxbectpbo5woksa0nfsds.lambda-url.us-east-1.on.aws/?adid=8228714f-00c3-47eb-88f9-07f2bef3b6a1&type=impression ]]>
        </Impression>
        <Impression>
        <![CDATA[ https://ywvvk4z447ggxbectpbo5woksa0nfsds.lambda-url.us-east-1.on.aws/?adid=8228714f-00c3-47eb-88f9-07f2bef3b6a1&type=impression_2 ]]>
        </Impression>
        <Impression>
        <![CDATA[ https://ywvvk4z447ggxbectpbo5woksa0nfsds.lambda-url.us-east-1.on.aws/?adid=8228714f-00c3-47eb-88f9-07f2bef3b6a1&type=impression_3 ]]>
        </Impression>
        <Creatives>
        <Creative>
        <Linear>
        <Duration>00:00:50</Duration>
        <TrackingEvents>
        <Tracking event="start">
        <![CDATA[ https://ywvvk4z447ggxbectpbo5woksa0nfsds.lambda-url.us-east-1.on.aws/?adid=8228714f-00c3-47eb-88f9-07f2bef3b6a1&type=start ]]>
        </Tracking>
        <Tracking event="firstQuartile">
        <![CDATA[ https://ywvvk4z447ggxbectpbo5woksa0nfsds.lambda-url.us-east-1.on.aws/?adid=8228714f-00c3-47eb-88f9-07f2bef3b6a1&type=firstQuartile ]]>
        </Tracking>
        <Tracking event="midpoint">
        <![CDATA[ https://ywvvk4z447ggxbectpbo5woksa0nfsds.lambda-url.us-east-1.on.aws/?adid=8228714f-00c3-47eb-88f9-07f2bef3b6a1&type=midpoint ]]>
        </Tracking>
        <Tracking event="thirdQuartile">
        <![CDATA[ https://ywvvk4z447ggxbectpbo5woksa0nfsds.lambda-url.us-east-1.on.aws/?adid=8228714f-00c3-47eb-88f9-07f2bef3b6a1&type=thirdQuartile ]]>
        </Tracking>
        <Tracking event="complete">
        <![CDATA[ https://ywvvk4z447ggxbectpbo5woksa0nfsds.lambda-url.us-east-1.on.aws/?adid=8228714f-00c3-47eb-88f9-07f2bef3b6a1&type=complete ]]>
        </Tracking>
        <Tracking event="mute">
        <![CDATA[ https://ywvvk4z447ggxbectpbo5woksa0nfsds.lambda-url.us-east-1.on.aws/?adid=8228714f-00c3-47eb-88f9-07f2bef3b6a1&type=mute ]]>
        </Tracking>
        <Tracking event="unmute">
        <![CDATA[ https://ywvvk4z447ggxbectpbo5woksa0nfsds.lambda-url.us-east-1.on.aws/?adid=8228714f-00c3-47eb-88f9-07f2bef3b6a1&type=unmute ]]>
        </Tracking>
        <Tracking event="rewind">
        <![CDATA[ https://ywvvk4z447ggxbectpbo5woksa0nfsds.lambda-url.us-east-1.on.aws/?adid=8228714f-00c3-47eb-88f9-07f2bef3b6a1&type=rewind ]]>
        </Tracking>
        <Tracking event="pause">
        <![CDATA[ https://ywvvk4z447ggxbectpbo5woksa0nfsds.lambda-url.us-east-1.on.aws/?adid=8228714f-00c3-47eb-88f9-07f2bef3b6a1&type=pause ]]>
        </Tracking>
        <Tracking event="resume">
        <![CDATA[ https://ywvvk4z447ggxbectpbo5woksa0nfsds.lambda-url.us-east-1.on.aws/?adid=8228714f-00c3-47eb-88f9-07f2bef3b6a1&type=resume ]]>
        </Tracking>
        <Tracking event="fullscreen">
        <![CDATA[ https://ywvvk4z447ggxbectpbo5woksa0nfsds.lambda-url.us-east-1.on.aws/?adid=8228714f-00c3-47eb-88f9-07f2bef3b6a1&type=fullscreen ]]>
        </Tracking>
        </TrackingEvents>
        <VideoClicks>
        <ClickThrough>
        <![CDATA[ https://ywvvk4z447ggxbectpbo5woksa0nfsds.lambda-url.us-east-1.on.aws/?adid=8228714f-00c3-47eb-88f9-07f2bef3b6a1&type=clickthrough ]]>
        </ClickThrough>
        <ClickTracking>
        <![CDATA[ https://ywvvk4z447ggxbectpbo5woksa0nfsds.lambda-url.us-east-1.on.aws/?adid=8228714f-00c3-47eb-88f9-07f2bef3b6a1&type=click ]]>
        </ClickTracking>
        </VideoClicks>
        <MediaFiles>
        <MediaFile delivery="progressive" type="audio/mpeg" bitrate="128" width="0" height="0" scalable="true" maintainAspectRatio="true">
        <![CDATA[ https://visual-audio.s3.amazonaws.com/audio-library/audio_iab7.mp3 ]]>
        </MediaFile>
        </MediaFiles>
        </Linear>
        </Creative>
        </Creatives>
        </InLine>
        </Ad>
        </VAST>`
    }
    let customVast = null;
    await fetch('https://visual-audio-engine.digitalavenues.net//api/get-custom-vast', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => { console.log(response); return response.text() })
        .then(data => {
            customVast = data;
        })
        .catch(error => console.error('Error:', error));
    const divId = "visual_audio_slot";
    const height = 300;
    const width = 500;
    const vastLog = document.getElementById('vastLog').checked;
    new VisualAudioVastPlayer(customVast, divId, height, width, vastLog);
}