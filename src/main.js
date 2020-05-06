import Vue from 'vue';
import Loading from './components/Loading/index.vue';

const Home = () => import('./pages/Home/index.vue'); 
const About = () => import('./pages/About/index.vue');
const routes = {
    default: '/',
    '/': Home,
    '/about': About,
}

const NotFound = Vue.component('NotFound', {
    template: '<div>404</div>',
});

const Router = Vue.component('Router', {
    template: `<div><lazyComponent /></div>`,
    mounted () {
        const router = this;
        const handleRouter = async () => {
            router.lazyComponent = Loading;
            this.path = location.hash.slice(1);
            if (router.cacheRoutes[router.path]) {
                // 如果路由加载过，直接加载
                router.lazyComponent = router.cacheRoutes[router.path];
                return;
            }
            // 否则异步加载
            if (this.path) {
                const PromiseRoute = this.routes[this.path] || (async () => ({ default: NotFound }));
                const component = await (PromiseRoute().then((resp) => resp.default));
                router.cacheRoutes[router.path] = component;
                router.lazyComponent = component;
            } else {
                location.hash = routes.default;
                handleRouter();
            }
            
        };
        window.addEventListener('hashchange', handleRouter);
        if (!location.hash.slice(1)) {
            location.hash = routes.default;
        }
        handleRouter();
    },
    data() {
        return {
            routes,
            cacheRoutes: {},
            path: location.hash.slice(1) || '/',
            lazyComponent: Loading,
        };
    },
    render(h) {
        return h(this.lazyComponent);
    },
});

const vm = new Vue({
    el: '#app',
    components: {
        Router,
    },
    template: `
        <Router />        
    `,
});

