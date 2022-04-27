const fs = require('fs');
const path = require('path');

module.exports = {
	devServer: {
		host: '172.16.220.252',
		port: 24238,
		proxy: {
			'/sockjs-node': {
				target: 'https://localhost:3000/sockjs-node',
				changeOrigin: true,
			},
		},
		https: {
			key: fs.readFileSync(path.join(__dirname, '..', 'naukanet.key')),
			cert: fs.readFileSync(path.join(__dirname, '..', 'naukaCert.key'))
		},
		hotOnly: false,
		disableHostCheck: true

	},
};
