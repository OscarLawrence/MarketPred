import { createResolver, defineNuxtModule, addComponentsDir, installModule } from 'nuxt/kit'


export default defineNuxtModule({
    meta: {
        name: 'nuxt-Widgets',
        configKey: 'widgets',
    },
    defaults: {

    },
    async setup(options, nuxt) {
        console.log('Widgets module loaded')
        const { resolve } = createResolver(import.meta.url)

        installModule(resolve('../Dragize'))

        // add runtime components directory
        addComponentsDir({
            path: resolve('runtime/components'),
        })
    }
})