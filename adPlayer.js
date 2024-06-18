document.onload = getAndRunCustomVast();

function getAndRunCustomVast() {
    const loading = document.createElement('span');
    loading.innerText = 'Loading...';
    const parentElement = document.currentScript.parentNode;
    parentElement.appendChild(loading);
    const adSlot = document.createElement('div');
    adSlot.id = 'visual_audio_slot';
    const scriptTag = document.createElement('script');
    scriptTag.src = './dist/visualAudioVastPlayer.js';
    scriptTag.defer = true;
    
    scriptTag.onerror = function() {
        console.log('Error loading script.');
    };
    scriptTag.onload = async function () {
        const ads = [
            "https://od-spy.live.streamtheworld.com/ondemand/ars?stid=1031633&type=preroll",
            "https://od-spy.live.streamtheworld.com/ondemand/ars?stid=1031633&type=preroll&scenario=vast-multiple-media"
        ]
        function getRandomAd() {
            const randomIndex = Math.floor(Math.random() * ads.length);
            return ads[randomIndex];
        }
        const params = { audio_vast_url: getRandomAd() }
        let audio_vast_xml = null
        await fetch(`https://visual-audio-engine.digitalavenues.net/api/get-audio-vast-xml?${new URLSearchParams(params).toString()}`)
        .then(response => { console.log(response); return response.text() })
            .then(data => {
                audio_vast_xml = data;
            })
            .catch(error => console.error('Error:', error));
        const payload = {
            audio_vast_xml: audio_vast_xml
        }
        let customVast = null;
        await fetch('https://visual-audio-engine.digitalavenues.net/api/get-custom-vast', {
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
        const autoPlay = document.getElementById('autoPlay').checked;
        parentElement.removeChild(loading);
        console.log(autoPlay);
        new VisualAudioVastPlayer(customVast, divId, height, width, vastLog, autoPlay);
    }
    parentElement.appendChild(adSlot);
    parentElement.appendChild(scriptTag);
}