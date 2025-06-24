<template>
  <div class="items-center justify-between p-4">
    <div class="flex items-center gap-4">
      <UDrawer direction="left">
        <UButton icon="mdi-menu" variant="ghost" color="neutral" />
        <template #content>
          <SideBar />
        </template>
      </UDrawer>
      MarketPred
    </div>
    <ColorModeButton />
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
