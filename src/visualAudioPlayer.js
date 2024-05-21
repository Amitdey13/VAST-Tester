import { VASTLoader } from 'iab-vast-loader';
import { warn, xmlToJSON } from "./utils";

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
        this.wrapPlayers();
        if (this.logger) {
            this.createLoggerElement();
        }
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
        this.videoBtn = document.createElement('button');
        this.videoBtn.id = 'visualAudioPlayBtn';
        this.videoBtn.className = "visual-audio-play-pause-btn";
        this.videoBtn.innerHTML = "&#9658;"
        this.videoPlayer.src = this.videoSrc.uri;
        this.videoPlayer.controls = false;
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
        this.wrapperDiv.appendChild(this.videoBtn);
    }
    
    createLoggerElement() {
        this.loggerList = document.createElement('ul');
        this.wrapperDiv = document.getElementById('visual_audio_slot');
        this.wrapperDiv.appendChild(this.loggerList);
    }

    addEventListeners() {
        this.videoBtn.addEventListener('click', () => {
            if (this.videoPlayer.paused) {
                this.videoPlayer.play();
                this.videoBtn.innerHTML = '&#10074; &#10074;';
            } else {
                this.videoPlayer.pause();
                this.videoBtn.innerHTML = "&#9658;"
            }
        });

        this.videoPlayer.addEventListener('play', () => this.visualAudioSyncPlay());
        this.videoPlayer.addEventListener('pause', () => this.visualAudioSyncPause());
        this.videoPlayer.addEventListener('seeking', () => this.visualAudioSyncSeek());
        this.videoPlayer.addEventListener('volumechange', () => this.visualAudioSyncVolume());
        
        this.triggerEvent('impression');
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
                this.videoBtn.innerHTML = "&#9658;"
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
    }

    visualAudioSyncPlay() {
        if (this.audioPlayer.paused) {
            this.audioPlayer.play();
        }
    }

    visualAudioSyncPause() {
        if (this.audioPlayer.duration > this.audioPlayer.currentTime) {
            this.videoPlayer.currentTime = 0;
            this.videoPlayer.play();
            this.isLooped = true;
        } else if (!this.audioPlayer.paused) {
            this.audioPlayer.pause();
        }
    }

    visualAudioSyncSeek() {
        if (this.isLooped) {
            this.isLooped = false;
        } else {
            this.audioPlayer.currentTime = this.videoPlayer.currentTime;
        }
    }

    visualAudioSyncVolume() {
        this.audioPlayer.volume = this.videoPlayer.volume;
    }

    triggerEvent(eventType) {
        if (this.audioEvents?.trackingEvents[eventType]?.length) {
            fetch(this.audioEvents.trackingEvents[eventType][0].uri, { method: 'GET', mode: "no-cors" });
        } else if (eventType === 'impression' && this.audioEvents?.impressions?.length) {
            fetch(this.audioEvents.impressions[0].uri, { method: 'GET', mode: "no-cors" });
        }
        if (this.logger) {
            const log = document.createElement('li');
            log.innerHTML = eventType;
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
