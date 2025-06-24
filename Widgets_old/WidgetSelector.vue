<template>
  <div ref="DrawerContent">
    <UDrawer :handle="false">
      <UButton
        label="Add Widgets..."
        color="neutral"
        variant="subtle"
        icon="mdi-add"
      />

      <template #content>
        <UCommandPalette
          v-model:search-term="searchTerm"
          :groups="groups"
          placeholder="Search Widgets..."
          class="h-[80vh]"
          @highlight="onHighlight"
        >
          <template #item-trailing="{ item, index }">
            <div class="flex items-center justify-between gap-4">
              <pre>{{ item }}</pre>
              <UModal>
                <UTooltip text="Preview Widget">
                  <UButton
                    icon="mdi-eye"
                    variant="subtle"
                    color="neutral"
                    class="cursor-pointer"
                    @click.prevent
                  />
                </UTooltip>
                <template #content>
                  <UCard>
                    <template #header>
                      <h2 class="text-lg font-semibold">{{ item.label }}</h2>
                      <p class="text-sm text-gray-500">
                        {{ item.suffix }}
                      </p>
                    </template>
                    <component
                      :is="availableWidgets[item.id]"
                      class="w-full h-full"
                    />
                  </UCard>
                </template>
              </UModal>
            </div>
            <div class="absolute right-0 z-100 top-[-100%]">
              <NuxtImg
                v-show="highlightedItem?.id === item.id"
                :src="item.screenshot"
                class="w-16 h-16 rounded-lg"
                :alt="item.label"
                :style="{ width: '100%', height: '100%' }"
              />
            </div>
          </template>
        </UCommandPalette>
      </template>
    </UDrawer>
  </div>
</template>

<script lang="ts" setup>
  import { WidgetGroups } from '~/config';

  const emits = defineEmits(['addWidget']);

  const { availableWidgets } = useWidgets();
  console.log('WidgetGroups:', WidgetGroups);

  const searchTerm = ref('');

  // const groups = computed(() => [
  //   {
  //     id: 'TradingView',
  //     label: 'TradingView',
  //     icon: 'mdi-chart-line',

  //     items: Object.keys(availableWidgets).map((key) => ({
  //       id: key,
  //       label: key,
  //       value: key,
  //       onClick: () => {
  //         // Handle item click
  //         console.log('Item clicked:', key);
  //         emits('addWidget', key);
  //       },
  //     })),
  //   },
  // ]);

  const groups = Object.entries(WidgetGroups).map(([key, group]) => {
    console.log(Object.entries(group.widgets));
    const items = Object.entries(group.widgets).map(([itemKey, item]) => {
      console.log('Item:', item);
      console.log('ItemKey:', itemKey);
      return {
        id: itemKey,
        label: item.label,
        suffix: item.description,
        icon: item.icon,
        screenshot: item.screenshot,
        value: key,
        options: item.options,
        onClick: () => {
          // Handle item click
          console.log('Item clicked:', itemKey);
          emits('addWidget', itemKey);
        },
      };
    });
    return {
      id: key,
      label: group.label,
      icon: group.icon,
      items,
    };
  });

  const highlightedItem = ref(null);

  const onHighlight = (item: any) => {
    // Handle item highlight
    console.log('Item highlighted:', item.value);
    highlightedItem.value = item.value;
  };
</script>

<style></style>
