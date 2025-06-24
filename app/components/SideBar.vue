<template>
  <div class="p-4">
    <UNavigationMenu orientation="vertical" :items="navLinks" />
  </div>
</template>

<script lang="ts" setup>
  const navLinks = [
    {
      label: 'Dashboard',
      icon: 'mdi-home',
      to: '/',
    },
    {
      label: 'Trade',
      icon: 'mdi-chart-line',
      to: '/trade',
    },
  ];
</script>

<style></style>
