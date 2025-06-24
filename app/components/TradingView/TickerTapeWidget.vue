<template>
  <div>
    <TickerTape :key="`${colorMode.value}`" :options="opts" />
  </div>
</template>

<script lang="ts" setup>



const props = defineProps({
  options: {
    type: Object,
    default: () => ({
            symbols: [
        { proName: 'NASDAQ:AAPL', title: 'Apple Inc.' },
        { proName: 'NASDAQ:GOOGL', title: 'Alphabet Inc.' },
        { proName: 'NASDAQ:AMZN', title: 'Amazon.com Inc.' },
        { proName: 'NASDAQ:MSFT', title: 'Microsoft Corp.' },
        { proName: 'NASDAQ:TSLA', title: 'Tesla Inc.' },
      ],
      isTransparent: false,
      displayMode: 'adaptive',
        })
    },
  
});

const colorMode = useColorMode();

const opts = computed(() => ({
    ...props.options,
    theme: colorMode.value,
  })
);

</script>

<style>

</style>