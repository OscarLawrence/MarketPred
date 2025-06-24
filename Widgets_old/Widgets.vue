<template>
  <div>
    <div class="flex justify-between">
      <div>
        <UButton
          :icon="editable ? 'mdi-close' : 'mdi-edit'"
          class="text-sm cursor-pointer"
          @click="editable = !editable"
        />
      </div>
      <div>
        <UModal title="Add Widget">
          <UButton
            v-if="editable"
            icon="mdi-plus"
            class="text-sm cursor-pointer"
            @click="addWidgetOpen = !addWidgetOpen"
          />
          <template #content>
            <UContainer class="overflow-y-scroll">
              <UCard
                v-for="(widget, name) in availableWidgets"
                :key="name"
                class="mt-4"
              >
                <template #header>
                  <div class="flex justify-between items-center">
                    <h3 class="text-lg font-bold">{{ name }}</h3>
                    <UButton
                      icon="mdi-plus"
                      class="text-sm cursor-pointer"
                      @click="selected.push(name)"
                    />
                  </div>
                </template>
                <UModal :title="name">
                  <UButton icon="mdi-view" class="text-sm cursor-pointer" />
                  <template #content>
                    <component :is="widget" />
                  </template>
                </UModal>
              </UCard>
            </UContainer>
          </template>
        </UModal>
      </div>

      <UButton
        :icon="editable ? 'mdi-close' : 'mdi-edit'"
        class="text-sm cursor-pointer"
        @click="editable = !editable"
      />
    </div>
    <UContainer>
      <div v-for="(name, index) in selected" :key="index">
        <component :is="availableWidgets[name]" />
      </div>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
  const Widget = defineAsyncComponent(() => import('./Widget.vue'));

  const props = defineProps({
    widgets: {
      type: Array,
      default: () => [],
    },
  });

  const selected = ref(props.widgets);

  const { availableWidgets } = useWidgets(selected);

  const emit = defineEmits(['update:widgets']);

  const editable = ref(false);
  const addWidgetOpen = ref(false);
</script>

<style></style>
