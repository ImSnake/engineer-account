import { io } from 'socket.io-client';
import AppDataServ from "@/services/AppDataServ";

const socket = io('https://172.16.220.252:24136');

socket.on("connect_error", (e) => {
	console.log(e);
	console.log('socket connection error');
});

socket.on('connect', () => {
	AppDataServ.setWebSocketHeader(socket.id);
});

export default {
	setOrder(orderId) {
		console.log('ebani');
		socket.emit('switch_order',  orderId);
	},

	setScoreWorksListener(callback) {
		console.log('menya');
		socket.on('order_message_work', callback);
	},

	offScoreWorksListener() {
		console.log('veslom');
		socket.off('order_message_work');
	},
}
