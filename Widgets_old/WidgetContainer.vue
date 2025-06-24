<template>
  <UContainer class="relative w-full h-full py-4">
    <div class="w-full h-10 flex justify-between items-center">
      <WidgetSelector />
      <UButton
        icon="mdi-lock-reset"
        class="cursor-pointer"
        :active="!editting"
        active-variant="subtle"
        @click="editting = !editting"
      />
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
  import WidgetSelector from './WidgetSelector.vue';
  const editting = ref(false);
</script>

<style></style>
