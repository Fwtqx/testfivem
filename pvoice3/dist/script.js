let audio = {}
let spatialSoundState = {}

const defaultConfig = { constraints: { autoGainControl: true, echoCancellation: true, noiseSuppression: true }, devices: {} }
let webRtcVoiceConfig = defaultConfig;

const eventToClient = (eventName, args) => {
	args = _objectSpread({}, args);
	const xhr = new XMLHttpRequest();
	xhr.open('POST', eventName);
	xhr.send(JSON.stringify(args));
};

const EVENTS = {
	START_TALKING: "unmuteMic",
	STOP_TALKING: "muteMic",
	PLAY_SOUND: "PLAY_SOUND",
	STOP_SOUND_BY_NAME: "STOP_SOUND_BY_NAME",
	STOP_ALL_SOUNDS: "STOP_ALL_SOUNDS",
	PLAY_SOUND_AT_POSITION: "PLAY_SOUND_AT_POSITION",
	SET_TALKING_MODE: "SET_TALKING_MODE"
}

const getSavedWebRtcConfig = () => {
	const savedConfig = JSON.parse(localStorage.getItem('rtcVoiceConfig')) || {};

	if (!savedConfig.constraints) {
		savedConfig.constraints = {}
	}

	for (const key in defaultConfig.constraints) {
		if (savedConfig.constraints[key] === undefined) {
			savedConfig.constraints[key] = defaultConfig.constraints[key];
		}
	}

	return savedConfig;
};

const getDevices = async () => {
	const devices = await navigator.mediaDevices.getUserMedia({ audio: webRtcVoiceConfig.constraints }).then(() => navigator.mediaDevices.enumerateDevices());
	return devices || [];
};

const toggleVoiceChatSettings = async toggle => {
	console.log(document.getElementById('rtcSettingsPage'));
	document.getElementById('rtcSettingsPage').style.display = toggle ? 'block' : 'none';

	if (toggle) {
		document.getElementById('echoCancellation').checked = webRtcVoiceConfig.constraints.echoCancellation;
		document.getElementById('autoGainControl').checked = webRtcVoiceConfig.constraints.autoGainControl;
		document.getElementById('noiseSuppression').checked = webRtcVoiceConfig.constraints.noiseSuppression;

		const outputElement = document.getElementById('outputDevices');
		const inputElement = document.getElementById('inputDevices');

		for (i = outputElement.options.length - 1; i >= 0; i--) {
			outputElement.remove(i);
		}

		for (i = inputElement.options.length - 1; i >= 0; i--) {
			inputElement.remove(i);
		}

		const devices = await getDevices();
		console.log(await navigator.mediaDevices.enumerateDevices());
		if (devices && devices.length > 0) {
			for (const index in devices) {
				const deviceInfo = devices[index];
				if (deviceInfo.kind === "audioinput") {
					const opt = document.createElement('option');
					opt.value = deviceInfo.label;
					opt.innerHTML = deviceInfo.label;
					inputElement.appendChild(opt);

					if (webRtcVoiceConfig.inputDevice && webRtcVoiceConfig.inputDevice === deviceInfo.label) {
						inputElement.selectedIndex = String(index);
					}
				} else if (deviceInfo.kind === "audiooutput") {
					const opt = document.createElement('option');
					opt.value = deviceInfo.label;
					opt.innerHTML = deviceInfo.label;
					outputElement.appendChild(opt);

					if (webRtcVoiceConfig.outputDevice && webRtcVoiceConfig.outputDevice === deviceInfo.label) {
						outputElement.selectedIndex = String(index);
					}
				}
			}
		}
	}
};

const saveCurrentWebRtcConfig = () => {
	localStorage.setItem('rtcVoiceConfig', JSON.parse(webRtcVoiceConfig))
};

const initialize = () => {
	if (window.stream) {
		window.stream.getTracks().forEach(track => {
			track.stop();
		});
	}

	webRtcVoiceConfig = getSavedWebRtcConfig();
	toggleVoiceChatSettings(true);
};

const playSoundByName = ({ sound, args = {} }) => {
	if (audio[sound]) {
		audio[sound].pause();
		audio[sound] = null;
	}

	const audioObject = new Audio("../files/" + sound + ".ogg");
	audioObject.volume = args.volume || 1.0;
	audioObject.loop = args.loop;

	audioObject.addEventListener("loadedmetadata", function () {
		audioObject.play();
		audio[sound] = audioObject;

		eventToClient("https://pvoice3/soundCallback", audioObject.duration);
	});
}

const stopSoundByName = ({ sound }) => {
	if (audio[sound]) {
		audio[sound].pause();
		audio[sound] = null;
	}
}

const stopAllSounds = () => {
	for (const elem in audio) audio[elem].pause();
	audio = [];
}

const createSpatialSoundEnv = () => {
	spatialSoundState.audioCtx = new AudioContext();

	if (!spatialSoundState.panner) {
		const panner = spatialSoundState.audioCtx.createPanner();
		panner.distanceModel = "inverse";
		panner.refDistance = 1;
		panner.maxDistance = 50;
		panner.rolloffFactor = 1;
		panner.coneInnerAngle = 360;
		panner.coneOuterAngle = 0;
		panner.coneOuterGain = 0;

		spatialSoundState.panner = panner;
	}
}

const playSoundAtPosition = ({ sound, args = {}, positionOffset, direction }) => {
	if (!spatialSoundState.audioCtx) {
		createSpatialSoundEnv();
	}

	const audioObject = new Audio("../files/" + sound + ".ogg");
	audioObject.volume = args.volume || 1.0;
	audioObject.loop = args.loop;

	spatialSoundState.audioCtx.listener.setOrientation(direction[0], direction[1], direction[2], 0, 0, -1)

	spatialSoundState.node = spatialSoundState.audioCtx.createMediaElementSource(audioObject);
	spatialSoundState.node.connect(spatialSoundState.panner);

	spatialSoundState.panner.setPosition(positionOffset.x, positionOffset.y, positionOffset.z);
	spatialSoundState.panner.connect(spatialSoundState.audioCtx.destination);

	audioObject.addEventListener("loadedmetadata", function () {
		audioObject.play();
	});
}

const eventHandler = {
	[EVENTS.START_TALKING]: () => document.getElementsByClassName("voiceIndicator")[0].style.display = "block",
	[EVENTS.STOP_TALKING]: () => document.getElementsByClassName("voiceIndicator")[0].style.display = "none",
	[EVENTS.SET_TALKING_MODE]: ({ mode }) => document.getElementsByClassName("voiceIndicator")[0].style.backgroundImage = 'url(radio/' + mode + '.png)',
	[EVENTS.PLAY_SOUND]: playSoundByName,
	[EVENTS.STOP_SOUND_BY_NAME]: stopSoundByName,
	[EVENTS.STOP_ALL_SOUNDS]: stopAllSounds,
	[EVENTS.PLAY_SOUND_AT_POSITION]: playSoundAtPosition
}

window.addEventListener("message", function (event) {
	const { type, arguments } = event.data;
	if (!type || !eventHandler[type]) return;

	eventHandler[type](arguments);
});

// setTimeout(initialize, 2000);