<template>
  <div>
    <Chart :options="options" />
  </div>
</template>

<script lang="ts" setup>
  interface CompareSymbolI {
    symbol: string;
    position: 'SameScale' | 'NewPane' | 'NewPriceScale';
  }

  interface ChartOptionsI {
    symbol: string;
    allow_symbol_change: boolean;
    interval:
      | '1m'
      | '3m'
      | '5m'
      | '15m'
      | '30m'
      | '1h'
      | '2h'
      | '4h'
      | '1d'
      | '1w';
    style: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
    theme: 'light' | 'dark';
    backgrounsdColor: string;
    gridColor: string;
    withdateranges: boolean;
    hide_side_toolbar: boolean;
    range: '1D' | '5D' | '1M' | '3M' | '6M' | 'YTD' | '1Y' | '5Y' | 'ALL';
    studies: string[];
    details: boolean;
    hide_volume: boolean;
    hotlist: boolean;
    compareSymbols: CompareSymbolI[];
    show_popup_button: boolean;
    popup_width: number;
    popup_height: number;
  }

  defineProps({
    options: {
      type: Object as PropType<ChartOptionsI>,
      default: () => ({
        symbol: 'AAPL',
        interval: '1h',
        allow_symbol_change: true,
        style: '1',
        theme: 'light',
        backgrounsdColor: '#ffffff',
        gridColor: '#e3e3e3',
        withdateranges: true,
        hide_side_toolbar: false,
        range: 'YTD',
        studies: [],
        details: false,
        hide_volume: false,
        hotlist: false,
        compareSymbols: [],
        show_popup_button: true,
        popup_width: 800,
        popup_height: 600,
      }),
    },
  });
</script>

<style></style>
