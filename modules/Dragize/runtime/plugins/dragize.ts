import { useDragizeDB } from "../composables/DragizeState"
import { getPadding } from "../utils";
import { getAbsolutePosition } from "../utils";


import { applyDragizeStyles, getOrCreateElementId, applyPosition, getRelativePosition, registerChild, applyParentStyles, getOrCreateResizeHandle } from "../utils"

const DEFAULT_OPTIONS = {
  parent: null,
  resize: true,
  drag: true,
  snap: 1,
  handleSize: 10
}


interface DraggerI {
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
  mode: 'drag' | 'resize' | null;
}

export default defineNuxtPlugin({
  name: 'dragize',
  enforce: 'pre',

  async setup(nuxtApp) {

    const dragizeOptions = useRuntimeConfig().public.dragize

    const dragger = reactive<DraggerI>({
      startX: 0,
      startY: 0,
      deltaX: 0,
      deltaY: 0,
      startPosition: { x: 0, y: 0, width: 0, height: 0 },
      maxTranslateX: 0,
      maxTranslateY: 0,
      mode: null, // 'drag' or 'resize',
      element: null
    })

    nuxtApp.vueApp.directive('dragize', {



      // beforeMount(el: HTMLElement, binding) {
      //   // Register the element in the dragize system
      //   const opts = binding.value || {}
      //   const options = { ...DEFAULT_OPTIONS, ...opts }
      //   const parent = options.parent || el.parentElement
      //   el.id = getOrCreateElementId(el, parent)

      //   registerChild(el, parent, options)
      // },

      async mounted(el: HTMLElement, binding) {

        const opts = binding.value || {}
        const options = { ...DEFAULT_OPTIONS, ...opts }
        const parent = options.parent || el.parentElement
        el.id = getOrCreateElementId(el, parent)

        applyParentStyles(parent)



        const db = await useDragizeDB(parent.id)
        let pos = db.value[el.id] ? JSON.parse(db.value[el.id]) : registerChild(el, parent, options)
        console.log(pos, 'HEELLLO')

        // if (!pos) {
        //   pos = getRelativePosition(el, parent)
        //   console.log('No position found, using default:', pos)

        //   db.value[el.id] = JSON.stringify(pos)
        // }

        // nextTick(() => {


        //   applyDragizeStyles(el, dragizeOptions)


        //   console.log(pos, el, parent)
        // })
        // if (!pos) {

        //   pos = getRelativePosition(el, parent)
        //   db.value[el.id] = JSON.stringify(pos)
        // }

        applyDragizeStyles(el, dragizeOptions)
        applyPosition(el, pos)



        const onMove = (event: MouseEvent | TouchEvent) => {
          event.preventDefault()
          event.stopPropagation()
          if (!dragger.mode) return // not dragging or resizing

          dragger.deltaX = (event instanceof MouseEvent ? event.clientX : event.touches[0].clientX) - dragger.startX
          dragger.deltaY = (event instanceof MouseEvent ? event.clientY : event.touches[0].clientY) - dragger.startY
          dragger.deltaX = Math.round(dragger.deltaX / dragizeOptions.snap) * dragizeOptions.snap
          dragger.deltaY = Math.round(dragger.deltaY / dragizeOptions.snap) * dragizeOptions.snap

          switch (dragger.mode) {
            case 'resize':

              el.style.width = `${dragger.startPosition.width + dragger.deltaX}px`
              el.style.height = `${dragger.startPosition.height + dragger.deltaY}px`

              break;

            case 'drag':
              dragger.deltaX = Math.max(0, Math.min(dragger.deltaX, dragger.maxTranslateX))
              dragger.deltaY = Math.max(0, Math.min(dragger.deltaY, dragger.maxTranslateY))

              el.style.transform = `translate(${dragger.deltaX}px, ${dragger.deltaY}px)`
              break;
          }
        }

        const removeListeners = () => {
          window.removeEventListener('mousemove', onMove)
          window.removeEventListener('touchmove', onMove)
          window.removeEventListener('mouseup', onEnd)
          window.removeEventListener('touchend', onEnd)
          window.removeEventListener('mouseleave', onEnd)
          window.removeEventListener('touchcancel', onEnd)

        }

        const onEnd = (event: MouseEvent | TouchEvent) => {
          event.preventDefault()
          event.stopPropagation()
          pos = getRelativePosition(el, parent)
          console.log('onEnd', pos, dragger)
          switch (dragger.mode) {
            case 'drag':
              el.classList.remove(dragizeOptions.draggingClass)
              break;
            case 'resize':
              el.classList.remove(dragizeOptions.resizingClass)


              break;
          }
          db.value = { ...db.value, [el.id]: JSON.stringify(pos) }
          removeListeners()
          dragger.mode = null

        }

        const addListeners = () => {
          window.addEventListener('mousemove', onMove)
          window.addEventListener('touchmove', onMove, { passive: true })
          window.addEventListener('mouseup', onEnd)
          window.addEventListener('touchend', onEnd, { passive: true })
          window.addEventListener('mouseleave', onEnd)
          window.addEventListener('touchcancel', onEnd, { passive: true })
        }

        const onResizeStart = (event: MouseEvent | TouchEvent) => {
          if (dragger.mode || dragger.element) return // already resizing or dragging
          event.preventDefault()
          event.stopPropagation()
          dragger.element = el.id
          dragger.startX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX
          dragger.startY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY
          dragger.mode = 'resize'
          dragger.startPosition = getAbsolutePosition(pos, parent)

          addListeners()
          el.classList.add(dragizeOptions.resizingClass)

        }

        if (options.resize) {
          const resizeHandle = getOrCreateResizeHandle(el, options)
          console.log(resizeHandle)

          resizeHandle.addEventListener('mousedown', onResizeStart)
          resizeHandle.addEventListener('touchstart', onResizeStart, { passive: true })
        }

        const onDragStart = (event: MouseEvent | TouchEvent) => {
          if (dragger.mode || dragger.element) return // already resizing or dragging
          event.preventDefault()
          event.stopPropagation()
          dragger.element = el.id

          dragger.startX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX
          dragger.startY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY
          dragger.mode = 'drag'

          const padding = getPadding(parent)

          dragger.maxTranslateX = parent.clientWidth - el.clientWidth - padding.left - padding.right
          dragger.maxTranslateY = parent.clientHeight - el.clientHeight - padding.top - padding.bottom

          console.log(dragger)
          addListeners()
          el.classList.add(dragizeOptions.draggingClass)
        }

        if (options.drag) {
          el.addEventListener('mousedown', onDragStart)
          el.addEventListener('touchstart', onDragStart, { passive: true })
        }





      },
      getSSRProps(binding, vnode) {
        // SSR: set initial position if possible
        // const opts = binding.value || {}
        // const options = { ...DEFAULT_OPTIONS, ...opts }
        // const parent = options.parent || (vnode.el && vnode.el.parentElement)
        // // Try to get position from initial value or fallback
        // let pos
        // if (typeof useDragizeDB === 'function' && parent && parent.id) {
        //   // Not possible to await in SSR, so fallback to initial or default
        //   // You may want to inject initial state via Nuxt payload for full SSR hydration
        //   pos = options.initialPosition || { x: 0, y: 0, width: 100, height: 100 }
        // } else {
        //   pos = options.initialPosition || { x: 0, y: 0, width: 100, height: 100 }
        // }
        // Apply position styles directly to vnode props
        return {
          style: {
          }
        }
      }
    })
  }
})