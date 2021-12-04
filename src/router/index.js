import { createRouter, createWebHashHistory } from 'vue-router'

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
				path: 'categorias',
				name: 'categories',
				component: () => import(/* webpackChunkName: "categoriesLayout" */'../modules/customer/layouts/CategoriesLayout'),
				children: [
					{
						path: 'productos',
						name: 'productsLayout',
						meta: {title: 'Productos'},
						component:  () => import(/* webpackChunkName: "productsLayout" */'../modules/customer/layouts/ProductsLayout'),
						children: [
							{
								path: ':productId',
								name: 'productDetailPage',
								meta: {title: 'Detalles de producto'},
								component:  () => import(/* webpackChunkName: "ProductDetailPage" */'../modules/customer/pages/ProductDetailPage'),
								props: true,
							},
							{
								path: '',
								name: 'products',
								meta: {title: 'Productos'},
								component:  () => import(/* webpackChunkName: "productsPage" */'../modules/customer/pages/ProductsPage'),
							}
						]

					}
					
				
				]
			},
			{
				path: '',
				name: 'home',
				meta: {title: 'Ardco'},
				component:  () => import(/* webpackChunkName: "homepage" */'../modules/customer/pages/HomePage')
			},
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
