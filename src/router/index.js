import { createRouter, createWebHistory } from 'vue-router';
import HomePage from "@/views/HomePage";
import AuthPage from "@/views/AuthPage";
import OrderPage from "@/views/OrderPage";
import ErrorPage from '@/views/ErrorPage';

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
	{
		path: '/error/:error',
		name: 'ErrorPage',
		props: true,
		component: ErrorPage
	}
]

const index = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});


export default index;
