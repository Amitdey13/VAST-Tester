import { VASTLoader } from 'iab-vast-loader';
import { warn, xmlToJSON } from "./utils";

class VisualAudioPlayer {
    constructor(videoVast, audioVast) {
        this.videoVast = videoVast;
        this.audioVast = audioVast;
        this.videoParsedXmlData = null;
        this.audioParsedXmlData = null;
        this.audioInlineVastData = null;
        this.audioEvents = null;
        this.videoSrc = null;
        this.audioSrc = null;
        this.initializePlayers();
    }

    async initializePlayers() {
        await this.loadVastData();
        console.log({
            videoParsedXmlData: this.videoParsedXmlData,
            audioParsedXmlData: this.audioParsedXmlData,
            audioInlineVastData: this.audioInlineVastData,
            audioEvents: this.audioEvents,
            videoSrc: this.videoSrc,
            audioSrc: this.audioSrc
        });
        this.createVideoPlayer();
        this.createAudioPlayer();
        this.wrapPlayers();
        this.addEventListeners();
    }

    async loadVastData() {
        [this.videoParsedXmlData, this.audioParsedXmlData] = await Promise.all([
            this.fetchVastData(this.videoVast),
            this.fetchVastData(this.audioVast)
        ]);
        console.log(this.videoParsedXmlData,  this.audioParsedXmlData);
        const _tmpAudioInlineVast = this.getAdFromVast('InLine', warn, this.audioParsedXmlData[this.audioParsedXmlData.length - 1]);
        this.audioInlineVastData = xmlToJSON(_tmpAudioInlineVast);
        const _tmpAudioLinearVast = this.getLinearFromInLine(_tmpAudioInlineVast, warn);
        this.audioEvents = this.getTrackingEvents(_tmpAudioLinearVast);
        this.videoSrc = this.getMediaFileUrl(xmlToJSON(this.getLinearFromInLine(this.getAdFromVast('InLine', warn, this.videoParsedXmlData[this.videoParsedXmlData.length - 1]), warn)).mediaFiles);
        this.audioSrc = this.getMediaFileUrl(xmlToJSON(_tmpAudioLinearVast)?.mediaFiles);
    }

    async fetchVastData(vastUrl) {
        const response = await new VASTLoader(vastUrl, { noSingleAdPods: true }).load();;
        return response;
    }

    getAdFromVast(type, warn, vast) {
        console.log(vast);
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

    getLinearFromInLine(inLine, warn) {
        const linearCreatives = inLine.creatives
            .toArray()
            .filter(creative => creative.linear != null)
        if (linearCreatives.length > 1) {
            warn('Multiple Linear elements in InLine, using first', inLine.uri)
        }
        return linearCreatives[0].linear
    }

    getMediaFileUrl(mediaFiles) {
        return mediaFiles[0];
    }

    getTrackingEvents(vastData) {
        const trackingEvents = xmlToJSON(this.getTrackingEventsFromLinearVast(vastData));
        const impressions = this.audioInlineVastData.impressions;

        const clickThroughs = this.audioInlineVastData.creatives[0].linear.videoClicks;

        return { trackingEvents, impressions, clickThroughs };
    }

    getTrackingEventsFromLinearVast(linear) {
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

    createVideoPlayer() {
        this.videoPlayer = document.createElement('video');
        this.videoPlayer.src = this.videoSrc.uri;
        this.videoPlayer.controls = true;
    }

    createAudioPlayer() {
        this.audioPlayer = document.createElement('audio');
        this.audioPlayer.src = this.audioSrc.uri;
        this.audioPlayer.controls = false;
    }

    wrapPlayers() {
        this.wrapperDiv = document.getElementById('visual_audio_player');
        this.wrapperDiv.appendChild(this.videoPlayer);
        this.wrapperDiv.appendChild(this.audioPlayer);
    }

    addEventListeners() {
        this.videoPlayer.addEventListener('play', () => this.visualAudioSyncPlay());
        this.videoPlayer.addEventListener('pause', () => this.visualAudioSyncPause());
        this.videoPlayer.addEventListener('seeking', () => this.visualAudioSyncSeek());
        this.videoPlayer.addEventListener('volumechange', () => this.visualAudioSyncVolume());

        // this.videoPlayer.addEventListener('canplay', () => this.checkCanPlay());
        // this.audioPlayer.addEventListener('canplay', () => this.checkCanPlay());

        // this.videoPlayer.addEventListener('play', () => this.triggerEvent('play'));
        // this.videoPlayer.addEventListener('pause', () => this.triggerEvent('pause'));
        // this.videoPlayer.addEventListener('ended', () => this.triggerEvent('complete'));
        // this.videoPlayer.addEventListener('click', () => this.triggerClickThrough());
    }

    visualAudioSyncPlay() {
        if (this.audioPlayer.paused) {
            this.audioPlayer.play();
        }
    }

    visualAudioSyncPause() {
        if (!this.audioPlayer.paused) {
            this.audioPlayer.pause();
        }
    }

    visualAudioSyncSeek() {
        this.audioPlayer.currentTime = this.videoPlayer.currentTime;
    }

    visualAudioSyncVolume() {
        this.audioPlayer.volume = this.videoPlayer.volume;
    }

    checkCanPlay() {
        if (this.videoPlayer.readyState >= 3 && this.audioPlayer.readyState >= 3) {
            this.visualAudioOnReady();
        }
    }

    visualAudioOnReady() {
        this.triggerEvent('impressions');
        fetch('https://example.com/api/onReady', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'ready' })
        }).then(response => response.json())
            .then(data => console.log('API Response:', data))
            .catch(error => console.error('Error:', error));
    }

    triggerEvent(eventType) {
        if (this.videoTrackingEvents.events[eventType]) {
            this.videoTrackingEvents.events[eventType].forEach(url => {
                fetch(url, { method: 'GET' });
            });
        }
    }

    triggerClickThrough() {
        if (this.videoTrackingEvents.clickThrough.length > 0) {
            window.open(this.videoTrackingEvents.clickThrough[0], '_blank');
        }
    }
}

window.VisualAudioPlayer = VisualAudioPlayer;
