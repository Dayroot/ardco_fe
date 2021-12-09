import { createRouter, createWebHashHistory } from 'vue-router';
import isOwnsPublication from './guards/verifyPublicationOwner';
import isAuthenticatedUser from './guards/verifyUserAuth'

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
								props: ( route ) => {
	
									if( isOwnsPublication(route) ){
										return {...route.params, editOption: true}
									}
		
									return { ...route.params};
								}
							},
							{
								path: ':categoryName',
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
				component:  () => import(/* webpackChunkName: "homepage" */'../modules/customer/pages/HomePage')
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
				meta: {title: 'Iniciar sesión', requiresAuth: false},
				component:  () => import(/* webpackChunkName: "loginPage" */'../modules/shared/pages/LoginPage')

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
    var is_auth = await isAuthenticatedUser();

	if( is_auth == to.meta.requiresAuth || is_auth && !to.meta.requiresAuth) 
		next()

	if( !is_auth && to.meta.requiresAuth){
		alert("Su sesión expiró, por favor vuelva a iniciar sesión");
		nex({name: 'login'})
	}
})


export default router
