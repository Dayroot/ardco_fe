import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [

	{
		path: '/:pathMatch(.*)*',
		name: 'no-found-page',
		component: () => import(/* webpackChunkName: "noFoundPage" */'../modules/shared/pages/NoFoundPage')
	},

	{
		path: '/',
		name: 'customer',
		component: () => import(/* webpackChunkName: "customerLayout" */'../modules/customer/layouts/CustomerLayout'),
		children: [
			{
				path: '',
				name: 'home',
        		meta: {title: 'Ardco'},
				component:  () => import(/* webpackChunkName: "customerHomepage" */'../modules/customer/pages/CustomerHomePage')
			},
			
		]
	},
  	{
		path: '/vender',
		name: 'seller',
		component: () => import(/* webpackChunkName: "sellerLayout" */'../modules/seller/layouts/SellerLayout'),
		children: [
			{
				path: '/articulos-publicados',
				name: 'publications',
				meta: {title: 'Articulos publicados'},
				component:  () => import(/* webpackChunkName: "publicationsPage" */'../modules/seller/pages/PublicationsPage')
			},
			{
				path: '',
				redirect: { name: 'publications' }
			}
		]
	},
  	{
		path: '/iniciar-sesion',
		name: 'login',
		meta: {title: 'Iniciar sesión'},
		component:  () => import(/* webpackChunkName: "loginPage" */'../modules/shared/pages/LoginPage')
	},
	{
		path: '/registrarse',
		name: 'signUp',
		meta: {title: 'Registrarse'},
		component:  () => import(/* webpackChunkName: "signUpPage" */'../modules/shared/pages/SignUpPage')
	},
  
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
  })


export default router
