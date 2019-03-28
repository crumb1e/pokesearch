import Home from './components/Home.vue'
import About from './components/About.vue'

export default [
    {
        path: '/:pokemon?',
        name: 'home',
        component: Home,
        props: true,
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    }
]