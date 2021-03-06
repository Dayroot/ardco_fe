import { createRouter, createWebHashHistory } from 'vue-router';
import isOwnsPublication from './guards/verifyPublicationOwner';
import isAuthenticatedUser from './guards/verifyUserAuth';
import Swal from 'sweetalert2';


const routes = [

	{
		path: '/:pathMatch(.*)*',
		name: 'no-found-page',
		component: () => import(/* webpackChunkName: "noFoundPage" */'../modules/shared/pages/NoFoundPage')
	},

	{
		path: '/',
		name: 'customerLayout',
		component: () => import(/* webpackChunkName: "customerLayout" */'../modules/customer/layouts/CustomerLayout'),
		children: [	
			{
				path: 'categoria',
				name: 'categories',
				component: () => import(/* webpackChunkName: "categoriesLayout" */'../modules/customer/layouts/CategoriesLayout'),
				children: [
					{
						path: '',
						name: 'productsLayout',
						meta: {title: 'Productos'},
						component:  () => import(/* webpackChunkName: "productsLayout" */'../modules/customer/layouts/ProductsLayout'),
						children: [
							{
								path: ':productId',
								name: 'productDetailPage',
								meta: {title: 'Detalles de producto', requiresAuth: false},
								component:  () => import(/* webpackChunkName: "ProductDetailPage" */'../modules/customer/pages/ProductDetailPage'),
								props: true,
							},
							{
								path: ':categoryId',
								name: 'products',
								meta: {title: 'Productos', requiresAuth: false},
								component:  () => import(/* webpackChunkName: "productsPage" */'../modules/customer/pages/ProductsPage'),
								props: true
							}
						]

					}
					
				
				]
			},
			{
				path: '',
				name: 'home',
				meta: {title: 'Ardco', requiresAuth: false},
				component:  () => import(/* webpackChunkName: "homepage" */'../modules/customer/pages/HomePage'),
				props: true
			},
			{
				path: 'registrarse',
				name: 'signUp',
				meta: {title: 'Registrarse', requiresAuth: false},
				component:  () => import(/* webpackChunkName: "signUpPage" */'../modules/shared/pages/SignUpPage')
			},
			{
				path: 'iniciar-sesion',
				name: 'login',
				meta: {title: 'Iniciar sesi??n', requiresAuth: false},
				component:  () => import(/* webpackChunkName: "loginPage" */'../modules/shared/pages/LoginPage'),
				props: true
			},
			{
				path: 'cuenta',
				name: 'account',
				meta: {title: 'Cuenta', requiresAuth: true},
				component:  () => import(/* webpackChunkName: "accountPage" */'../modules/customer/pages/AccountDataPage'),
			},
			{
				path: 'carrito-de-compras',
				name: 'shoppingCartPage',
				meta: {title: 'Carrito de compras', requiresAuth: false},
				component:  () => import(/* webpackChunkName: "shoppingCartPage" */'../modules/customer/pages/ShoppingCartPage'),
			},
			{
				path: 'carrito-de-compras/pago',
				name: 'payment',
				meta: {title: 'Pago', requiresAuth: false},
				component:  () => import(/* webpackChunkName: "paymentPage" */'../modules/customer/pages/PaymentPage'),
				props: true,
			},
			{
				path: 'orden-de-compra-completada',
				name: 'orderCompleted',
				meta: {title: 'Orden de compra completada', requiresAuth: false},
				component:  () => import(/* webpackChunkName: "orderCompletedPage" */'../modules/customer/pages/OrderCompletedPage'),
			},
			{
				path: 'completar-datos-de-usuario',
				name: 'completeUserData',
				meta: {title: 'Completar datos de usuario', requiresAuth: false},
				component:  () => import(/* webpackChunkName: "completeUserDataPage" */'../modules/customer/pages/CompleteUserDataPage'),
			},
			{
				path: 'vender',
				name: 'sell',
				meta: {title: 'Vender', requiresAuth: true},
				component:  () => import(/* webpackChunkName: "sellPage" */'../modules/customer/pages/SellPage'),
			},
			{
				path: 'nueva-publicaci??n',
				name: 'newPublication',
				meta: {title: 'Nueva publicaci??n', requiresAuth: true},
				component:  () => import(/* webpackChunkName: "newPublicationPage" */'../modules/customer/pages/NewPublicationPage'),
			}

		]
	},

]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

router.beforeEach( async(to, from, next) => {
    document.title = to.meta.title
    let is_auth = await isAuthenticatedUser(to, from, next);

	if( is_auth == to.meta.requiresAuth || is_auth && !to.meta.requiresAuth) 
		next();

	else if( !is_auth && to.meta.requiresAuth){
		Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Oops...',
            text: 'Necesitas iniciar sesi??n, para poder continuar.',
            showConfirmButton: false,
            timer: 3000
        });
		next({name: 'login', params:{ logOut: true }})
	}

	// // if(to.name=="payment" && from.name != "shoppingCartPage"){
	// // 	next({name: 'no-found-page'})
	// // }
	
})


export default router
