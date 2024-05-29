import { VASTLoader } from 'iab-vast-loader';
import { warn, xmlToJSON } from "./utils";

const playSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="18" viewBox="0 0 384 512"><<path fill="#ffffff" d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>';
const pauseSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="15" viewBox="0 0 320 512"><path fill="#ffffff" d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>';
const muteSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="27" viewBox="0 0 576 512"><path fill="#ffffff" d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM425 167l55 55 55-55c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-55 55 55 55c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-55-55-55 55c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l55-55-55-55c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0z"/></svg>';
const unmuteSvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="21" viewBox="0 0 448 512"><path fill="#ffffff" d="M301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3zM412.6 181.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5z"/></svg>';
const replaySvg = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512"><path fill="#ffffff" d="M0 224c0 17.7 14.3 32 32 32s32-14.3 32-32c0-53 43-96 96-96H320v32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9S320 19.1 320 32V64H160C71.6 64 0 135.6 0 224zm512 64c0-17.7-14.3-32-32-32s-32 14.3-32 32c0 53-43 96-96 96H192V352c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V448H352c88.4 0 160-71.6 160-160z"/></svg>';

class VisualAudioPlayer {
    constructor(videoVast, audioVast, log = false) {
        this.videoVast = videoVast;
        this.audioVast = audioVast;
        this.logger = log;
        this.videoParsedXmlData = null;
        this.audioParsedXmlData = null;
        this.audioInlineVastData = null;
        this.audioEvents = null;
        this.videoSrc = null;
        this.audioSrc = null;
        this.audioPaused = false;
        this.isLooped = false;
        this.timeElasped = { firstQuartile: false, midpoint: false, thirdQuartile: false }
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
        this.createPlayerControls();
        this.wrapPlayers();
        if (this.logger) {
            this.createLoggerElement();
        }
        this.addEventListeners();
        this.addControlEvents();
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
        this.videoPlayer.controls = false;
        this.videoPlayer.muted = true;
    }

    createAudioPlayer() {
        this.audioPlayer = document.createElement('audio');
        this.audioPlayer.src = this.audioSrc.uri;
        this.audioPlayer.controls = false;
    }

    createPlayerControls() {
        this.controlsContainer = document.createElement('div');
        const innerDiv = document.createElement('div');
        innerDiv.style.display = 'flex';
        this.videoBtn = this.createButton();
        this.videoBtn.innerHTML = playSvg
        this.replayBtn = this.createButton();
        this.replayBtn.innerHTML = replaySvg;
        this.replayBtn.style.marginLeft = '20px';
        this.soundBtn = this.createButton();
        this.soundBtn.innerHTML = unmuteSvg;
        innerDiv.appendChild(this.videoBtn);
        innerDiv.appendChild(this.replayBtn);
        this.controlsContainer.appendChild(innerDiv);
        this.controlsContainer.appendChild(this.soundBtn);
        this.controlsContainer.style.display = 'flex';
        this.controlsContainer.style.width = '90%';
        this.controlsContainer.style.justifyContent = 'space-between';
        this.controlsContainer.style.position = 'absolute';
        this.controlsContainer.style.paddingInline = '5%';
        this.controlsContainer.style.bottom = '10%';
    }

    createButton() {
        const button = document.createElement('button');
        button.style.backgroundColor = 'transparent';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.cursor = 'pointer';
        button.style.fontSize = '1.5em';
        return button;
    }

    wrapPlayers() {
        this.wrapperDiv = document.getElementById('visual_audio_player');
        this.wrapperDiv.style.position = 'relative';
        this.wrapperDiv.appendChild(this.videoPlayer);
        this.wrapperDiv.appendChild(this.audioPlayer);
        this.wrapperDiv.appendChild(this.controlsContainer);
    }
    
    createLoggerElement() {
        this.loggerList = document.createElement('ul');
        this.wrapperDiv = document.getElementById('visual_audio_slot');
        this.wrapperDiv.appendChild(this.loggerList);
    }

    addControlEvents() {
        this.videoBtn.addEventListener('click', () => {
            if (this.videoPlayer.paused) {
                this.videoPlayer.play();
                this.videoBtn.innerHTML = pauseSvg;
            } else {
                this.videoPlayer.pause();
                this.videoBtn.innerHTML = playSvg;
            }
        });

        this.soundBtn.addEventListener('click', () => {
            if (this.audioPlayer.muted) {
                this.audioPlayer.muted = false;
                this.soundBtn.innerHTML = unmuteSvg;
            } else {
                this.audioPlayer.muted = true;
                this.soundBtn.innerHTML = muteSvg;
            }
        });

        this.replayBtn.addEventListener('click', () => {
            if (this.audioPlayer.currentTime > 0) {
                this.audioPlayer.currentTime = 0;
                this.videoPlayer.currentTime = 0;
                this.triggerEvent('rewind');
                this.timeElasped = { firstQuartile: false, midpoint: false, thirdQuartile: false };
            }
        });
    }

    addEventListeners() {
        this.videoPlayer.addEventListener('play', () => this.visualAudioSyncPlay());
        this.videoPlayer.addEventListener('pause', () => this.visualAudioSyncPause());
        this.videoPlayer.addEventListener('volumechange', () => this.visualAudioSyncVolume());
        
        this.audioPlayer.addEventListener('play', () => {
            if (!this.audioPaused) {
                this.triggerEvent('start');
            } else {
                this.triggerEvent('resume');
                this.audioPaused = false;
            }
        });        
        this.audioPlayer.addEventListener('pause', () => {
            if (!this.audioPlayer.ended) {
                this.triggerEvent('pause');
                this.audioPaused = true;
            }
        });
        this.audioPlayer.addEventListener('volumechange', () => {
            if(this.audioPlayer.muted) {
                this.triggerEvent('mute');
            } else {
                this.triggerEvent('unmute');
            }
        });
        this.audioPlayer.addEventListener('ended', () => {
            this.triggerEvent('complete');
            if (!this.videoPlayer.paused) {
                this.videoPlayer.pause();
                this.videoBtn.innerHTML = playSvg;
            }
        });
        this.audioPlayer.addEventListener('timeupdate', () => {
            const currentTime = this.audioPlayer.currentTime;
            const duration = this.audioPlayer.duration;
            const quartile = duration / 4;
        
            if (currentTime >= quartile && !this.timeElasped.firstQuartile) {
                this.triggerEvent('firstQuartile');
                this.timeElasped.firstQuartile = true;
            } else if (currentTime >= quartile * 2 && !this.timeElasped.midpoint) {
                this.triggerEvent('midpoint');
                this.timeElasped.midpoint = true;
            } else if (currentTime >= quartile * 3 && !this.timeElasped.thirdQuartile) {
                this.triggerEvent('thirdQuartile');
                this.timeElasped.thirdQuartile = true;
            }
        });
        // this.videoPlayer.addEventListener('click', () => this.triggerClickThrough());
        this.audioEvents.impressions?.forEach((_, index) => {
            this.triggerEvent('impression', index);
        });
    }

    visualAudioSyncPlay() {
        if (this.audioPlayer.paused) {
            this.audioPlayer.play();
        }
    }

    visualAudioSyncPause() {
        if (this.videoPlayer.ended && (this.audioPlayer.duration > this.audioPlayer.currentTime)) {
            this.videoPlayer.currentTime = 0;
            this.videoPlayer.play();
            this.isLooped = true;
        } else if (!this.audioPlayer.paused) {
            this.audioPlayer.pause();
        }
    }

    visualAudioSyncVolume() {
        this.audioPlayer.volume = this.videoPlayer.volume;
    }

    triggerEvent(eventType, index = 0) {
        let uri = null;
        if (eventType === 'impression') {
            uri = this.audioEvents.impressions[index].uri;
            fetch(this.audioEvents.impressions[index].uri, { method: 'GET', mode: "no-cors" });
        } else if (this.audioEvents?.trackingEvents[eventType]?.length) {
            uri = this.audioEvents.trackingEvents[eventType][0].uri;
            fetch(this.audioEvents.trackingEvents[eventType][0].uri, { method: 'GET', mode: "no-cors" });
        }
        if (this.logger) {
            const log = document.createElement('li');
            const eventSpan = document.createElement('div');
            eventSpan.innerHTML = `<strong>Event:</strong> ${eventType}`;
            const uriSpan = document.createElement('div');
            uriSpan.innerHTML = `<strong>URL:</strong> ${uri}`;
            log.appendChild(eventSpan);
            log.appendChild(uriSpan);
            this.loggerList.appendChild(log);
        }
    }

    triggerClickThrough() {
        if (this.videoTrackingEvents.clickThrough.length > 0) {
            window.open(this.videoTrackingEvents.clickThrough[0], '_blank');
        }
    }
}

window.VisualAudioPlayer = VisualAudioPlayer;
