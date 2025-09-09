export default defineNuxtRouteMiddleware((to, from) => {

    const myCookie = useCookie('yourCookieName')

    if (!myCookie.value) {
        return navigateTo('/login')
    }

    // skip middleware on server
    if (import.meta.server) return
    // skip middleware on client side entirely
    if (import.meta.client) return

    // or only skip middleware on initial client load
    const nuxtApp = useNuxtApp()
    if (import.meta.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) return
})
