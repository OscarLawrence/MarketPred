<template>
  <div
    class="widget-wrapper absolute"
    :style="{
      top: `${window_top}px`,
      left: `${window_left}px`,
      width: window_width,
      height: window_height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
    }"
    :class="cursorClass"
    @mousedown.prevent="handleMouseDown"
    @mousemove="handleMouseMove"
  >
    <UCard class="w-full h-full">
      <template #header>
        <slot name="header">
          <h2>{{ title }}</h2>
        </slot>
      </template>
      <slot>
        <Placeholder class="h-32" />
      </slot>
      <template #footer>
        <Placeholder class="h-8" />
      </template>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { UCard } from '#components';

  const props = defineProps({
    title: { type: String, default: null },
    top: { type: Number, default: 0 },
    left: { type: Number, default: 0 },
    width: { type: String, default: '100%' },
    height: { type: String, default: '100%' },
    minWidth: { type: String, default: '100px' },
    minHeight: { type: String, default: '100px' },
    maxWidth: { type: String, default: '100%' },
    maxHeight: { type: String, default: '100%' },
  });

  const window_top = ref(props.top);
  const window_left = ref(props.left);
  // Use pixel values for width/height for resizing to work smoothly

  const window_width = ref(props.width);
  const window_height = ref(props.height);

  const cursorClass = ref('');
  const dragMode = ref<'none' | 'move' | 'resize'>('none');
  const resizeDir = ref('');
  const dragStart = ref({ x: 0, y: 0, top: 0, left: 0, width: 0, height: 0 });

  const threshold = 10;

  function getResizeDirection(offsetX: number, offsetY: number, rect: DOMRect) {
    const nearLeft = offsetX < threshold;
    const nearRight = rect.width - offsetX < threshold;
    const nearTop = offsetY < threshold;
    const nearBottom = rect.height - offsetY < threshold;

    if (nearLeft && nearTop) return 'nw';
    if (nearRight && nearTop) return 'ne';
    if (nearLeft && nearBottom) return 'sw';
    if (nearRight && nearBottom) return 'se';
    if (nearLeft) return 'w';
    if (nearRight) return 'e';
    if (nearTop) return 'n';
    if (nearBottom) return 's';
    return '';
  }

  function getCursorClass(dir: string) {
    switch (dir) {
      case 'nw':
      case 'se':
        return 'cursor-nwse-resize';
      case 'ne':
      case 'sw':
        return 'cursor-nesw-resize';
      case 'n':
      case 's':
        return 'cursor-ns-resize';
      case 'e':
      case 'w':
        return 'cursor-ew-resize';
      default:
        return 'cursor-grab';
    }
  }

  const handleMouseMove = (event: MouseEvent) => {
    // Only update cursor if not dragging/resizing
    if (dragMode.value === 'none') {
      const wrapper = event.currentTarget as HTMLElement;
      const rect = wrapper.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const dir = getResizeDirection(offsetX, offsetY, rect);
      cursorClass.value = getCursorClass(dir);
    }
  };

  function onWindowMouseMove(event: MouseEvent) {
    if (dragMode.value === 'move') {
      const dx = event.clientX - dragStart.value.x;
      const dy = event.clientY - dragStart.value.y;
      window_left.value = dragStart.value.left + dx;
      window_top.value = dragStart.value.top + dy;
    } else if (dragMode.value === 'resize') {
      let newWidth = dragStart.value.width;
      let newHeight = dragStart.value.height;
      let newLeft = dragStart.value.left;
      let newTop = dragStart.value.top;
      const dx = event.clientX - dragStart.value.x;
      const dy = event.clientY - dragStart.value.y;

      switch (resizeDir.value) {
        case 'se':
          newWidth += dx;
          newHeight += dy;
          break;
        case 'sw':
          newWidth -= dx;
          newLeft += dx;
          newHeight += dy;
          break;
        case 'ne':
          newWidth += dx;
          newHeight -= dy;
          newTop += dy;
          break;
        case 'nw':
          newWidth -= dx;
          newLeft += dx;
          newHeight -= dy;
          newTop += dy;
          break;
        case 'e':
          newWidth += dx;
          break;
        case 'w':
          newWidth -= dx;
          newLeft += dx;
          break;
        case 'n':
          newHeight -= dy;
          newTop += dy;
          break;
        case 's':
          newHeight += dy;
          break;
      }
      window_width.value = newWidth + 'px';
      window_height.value = newHeight + 'px';
      window_left.value = newLeft;
      window_top.value = newTop;
    }
  }

  function onWindowMouseUp() {
    dragMode.value = 'none';
    resizeDir.value = '';
    window.removeEventListener('mousemove', onWindowMouseMove);
    window.removeEventListener('mouseup', onWindowMouseUp);
  }

  const handleMouseDown = (event: MouseEvent) => {
    const wrapper = event.currentTarget as HTMLElement;
    const rect = wrapper.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const dir = getResizeDirection(offsetX, offsetY, rect);

    dragStart.value = {
      x: event.clientX,
      y: event.clientY,
      top: window_top.value,
      left: window_left.value,
      width: parseInt(rect.width + ''),
      height: parseInt(rect.height + ''),
    };

    if (dir) {
      dragMode.value = 'resize';
      resizeDir.value = dir;
    } else {
      dragMode.value = 'move';
    }
    // Attach listeners to window to ensure we track mouse even outside the widget
    window.addEventListener('mousemove', onWindowMouseMove);
    window.addEventListener('mouseup', onWindowMouseUp);
  };

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', onWindowMouseMove);
    window.removeEventListener('mouseup', onWindowMouseUp);
  });
</script>

<style>
  /* filepath: /home/vincent/Documents/VincentsMonoRepo/Projects/MarketPred/MarketPred_Client/app/components/Widget.vue */
  .widget-wrapper {
    position: absolute;
    /* Prevent text selection while dragging/resizing */
    user-select: none;
  }
  .cursor-nwse-resize {
    cursor: nwse-resize !important;
  }
  .cursor-nesw-resize {
    cursor: nesw-resize !important;
  }
  .cursor-ew-resize {
    cursor: ew-resize !important;
  }
  .cursor-ns-resize {
    cursor: ns-resize !important;
  }
  .cursor-grab {
    cursor: grab !important;
  }
</style>
