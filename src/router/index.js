import { createRouter, createWebHistory } from 'vue-router';
import HomePage from "@/views/HomePage";
import AuthPage from "@/views/AuthPage";
import OrderPage from "@/views/OrderPage";

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomePage
	},
	{
		path: '/auth',
		name: 'Auth',
		component: AuthPage
	},
	{
		path: '/order/:orderId',
		name: 'Order',
		props: true,
		component: OrderPage
	},
]

const index = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});


export default index;
