import { createResolver, defineNuxtModule, addPlugin, addImportsDir } from 'nuxt/kit'


export default defineNuxtModule({
    meta: {
        name: 'nuxt-dragize',
        configKey: 'dragize',
    },
    defaults: {
        persistence: 'indexedDB', // or 'localStorage'
        dragClass: 'dragize-draggable', // class to add to the element being dragged
        draggingClass: 'dragize-dragging', // class to add to the element being dragged
        resizeClass: 'dragize-resizable', // class to add to the element being resized
        resizingClass: 'dragize-resizing', // class to add to the element being resized
        handleClass: 'dragize-handle', // class for the resize handle
        handleSize: 10, // size of the resize handle in pixels
        snap: 1, // snap to grid size in pixels
    },

    async setup(options, nuxt) {
        console.log('Dragize module loaded')
        const { resolve } = createResolver(import.meta.url)

        // add scss
        nuxt.options.css.push(resolve('runtime/assets/main.scss'))

        // add module options to runtime config
        nuxt.options.runtimeConfig.public.dragize = options

        // add composables
        addImportsDir(resolve('runtime/composables'))


        // add dragize directive
        addPlugin({
            src: resolve('runtime/plugins/dragize.ts')
        })

    }

})