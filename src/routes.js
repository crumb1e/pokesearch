import Home from './components/Home.vue'

export default [
    {
        path: '/:pokemon?',
        name: 'home',
        component: Home,
        props: true,
    }
]