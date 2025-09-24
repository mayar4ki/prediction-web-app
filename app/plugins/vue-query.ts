import type {
    DehydratedState,
    VueQueryPluginOptions,
} from '@tanstack/vue-query'
import {
    VueQueryPlugin,
    QueryClient,
    hydrate,
    dehydrate,
} from '@tanstack/vue-query'
// Nuxt 3 app aliases
import { defineNuxtPlugin, useState } from '#imports'
import { toast } from 'vue-sonner'

export default defineNuxtPlugin((nuxt) => {
    const vueQueryState = useState<DehydratedState | null>('vue-query')

    // Modify your Vue Query global settings here
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5000,
                throwOnError(error) {
                    toast.error(`${(error as unknown as Record<string, string>).shortMessage ?? (error).name}`, {
                        description: `${(typeof error?.cause === 'string' ? error?.cause : "") ?? (error).name}`,
                        action: {
                            label: 'Close'
                        }
                    })
                    return false
                }
            },
            mutations: {
                throwOnError(error) {
                    toast.error(`${(error as unknown as Record<string, string>).shortMessage ?? (error).name}`, {
                        description: `${(typeof error?.cause === 'string' ? error?.cause : "") ?? (error).name}`,
                        action: {
                            label: 'Close'
                        },
                    })
                    return false
                },
            }
        },

    })
    const options: VueQueryPluginOptions = { queryClient }

    nuxt.vueApp.use(VueQueryPlugin, options)

    if (import.meta.server) {
        nuxt.hooks.hook('app:rendered', () => {
            vueQueryState.value = dehydrate(queryClient)
        })
    }

    if (import.meta.client) {
        hydrate(queryClient, vueQueryState.value)
    }
})