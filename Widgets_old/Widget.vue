<template>
  <div>
    <component :is="component" />
    <pre>{{ component }}</pre>
  </div>
</template>

<script lang="ts" setup>
  defineProps({
    component: {
      type: Object,
      required: true,
    },
  });
</script>

<style></style>
