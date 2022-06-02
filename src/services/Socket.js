import { io } from 'socket.io-client';
import AppDataServ from "@/services/AppDataServ";

const socket = io('https://172.16.220.252:24136');
//const socket = io('https://socket-emp.naukanet.ru');

socket.on("connect_error", (e) => {
	console.log(e);
	console.log('socket connection error');
});

socket.on('connect', () => {
	AppDataServ.setWebSocketHeader(socket.id);
});

export default {
	setOrder(orderId) {
		socket.emit('switch_order',  orderId);
	},

	setScoreWorksListener(callback) {
		socket.on('order_message_work', callback);
	},

	offScoreWorksListener() {
		socket.off('order_message_work');
	},
}
