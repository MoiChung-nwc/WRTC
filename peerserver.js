const PeerServer = require('peer').PeerServer;

var server = PeerServer({
    port: 9090,
    path: '/peerserver',
    proxied : true
});

console.log("Srart PeerJS Server");