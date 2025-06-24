<template>
  <div class="h-full min-h-screen flex flex-col">
    <TopNav class="w-full flex h-12 border-b-gray-200 border-b-1" />
    <div class="h-full flex w-full flex-grow">
      <!-- <SideBar class="h-full w-32 border-r-gray-200 border-r-1" /> -->
      <div class="flex-1 overflow-y-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
