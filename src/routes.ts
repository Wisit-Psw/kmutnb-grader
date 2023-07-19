import EditorPage from "./pages/EditorPage.vue"
import AuthenticationPage from "./pages/AuthenticationPage.vue"
import PageNotFound from "./pages/PageNotFound.vue"
import authenticate from "./module/authenticate"

export const routes = [
    {
        path: '/editor', component: EditorPage,
        beforeEnter: async (to: any, from :any) => {
            await authenticate();
        },
    },
    {
        path: '/login', component: AuthenticationPage,
        beforeEnter: async (to: any, from :any) => {
            const isAuthenticated = await authenticate();

            if( isAuthenticated ) return '/editor';
        },
    },
    {
        path: '/', component: AuthenticationPage,
        beforeEnter: async (to: any, from :any) => {
            const isAuthenticated = await authenticate();

            if( isAuthenticated ) return '/editor';
        },
    },
    { 
        path: '/:pathMatch(.*)*', component: PageNotFound 
    }
]

export default routes;