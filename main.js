// const { default: Peer } = require("peerjs");

const { default: Peer } = require("peerjs");

function openStream() {
    const config = { audio: false, video: true};
    return navigator.mediaDevices.getUserMedia(config);
}

function playStream(idVideoTag, stream) {
    const video = document.getElementById(idVideoTag);
    video.srcObject = stream;
    video.play();
}

openStream()
.then(stream => playStream('localStream', stream));

// const peer = new Peer({key: 'zfoh5xhzll900000'});

// peer.on('open', id => console.log(id));

const CONFIG_NON_STUN_TURN_SERVER = {
    host: "127.0.0.1",
    port: 9090,
    path: '/peerserver'    
};

let peer = new Peer('null', CONFIG_NON_STUN_TURN_SERVER);




