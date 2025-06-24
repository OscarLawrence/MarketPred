<template>
  <WidgetWrapper name="TradingView Chart" :settings="settings">
    <template #default="{ state }">
      <Chart
        style="width: 100%; height: 100%"
        :options="{
          ...state,
          theme: colorMode.value,
          support_host: 'https://www.tradingview.com',
        }"
        :key="JSON.stringify({ ...state, theme: colorMode.value })"
      />
      <!-- <pre>{{ state.symbol }}</pre> -->
    </template>
  </WidgetWrapper>
</template>

<script lang="ts" setup>
  const colorMode = useColorMode();

  const settings = {
    symbol: {
      type: 'string',
      label: 'Symbol',
      default: 'AAPL',
      description: 'The symbol to display on the chart',
    },
    interval: {
      type: 'select',
      label: 'Interval',
      default: '1D',
      options: [
        {
          value: 1,
          label: '1 Minute',
        },
        {
          value: 3,
          label: '3 Minutes',
        },
        {
          value: 5,
          label: '5 Minutes',
        },
        {
          value: 15,
          label: '15 Minutes',
        },
        {
          value: 30,
          label: '30 Minutes',
        },
        {
          value: 60,
          label: '1 Hour',
        },
        {
          value: 120,
          label: '2 Hours',
        },
        {
          value: 180,
          label: '3 Hours',
        },
        {
          value: 240,
          label: '4 Hours',
        },
        {
          value: '1D',
          label: '1 Day',
        },
        {
          value: '1W',
          label: '1 Week',
        },
      ],
      description: 'The interval for the chart',
    },
    allow_symbol_change: {
      type: 'boolean',
      label: 'Allow Symbol Change',
      default: true,
      description: 'Allow the user to change the symbol on the chart',
    },
    style: {
      type: 'select',
      label: 'Style',
      default: '1',
      options: [
        {
          value: 0,
          label: 'Bar',
        },
        {
          value: 1,
          label: 'Candlestick',
        },

        {
          value: 2,
          label: 'Line',
        },

        {
          value: 3,
          label: 'Area',
        },

        {
          value: 4,
          label: 'Renko',
        },
        {
          value: '5',
          label: 'Heikin Ashi',
        },
        {
          value: '7',
          label: 'Kagi',
        },
        {
          value: '8',
          label: 'Line Break',
        },
        {
          value: '9',
          label: 'Point & Figure',
        },
        {
          value: '10',
          label: 'Range',
        },
      ],
      description: 'The style of the chart',
    },
    backgroundColor: {
      type: 'color',
      label: 'Background Color',
      default: '#ffffff',
      description: 'The background color of the chart',
    },
    gridColor: {
      type: 'color',
      label: 'Grid Color',
      default: '#e3e3e3',
      description: 'The grid color of the chart',
    },
    withdateranges: {
      type: 'boolean',
      label: 'With Date Ranges',
      default: true,
      description: 'Show date ranges on the chart',
    },
    hide_side_toolbar: {
      type: 'boolean',
      label: 'Hide Side Toolbar',
      default: false,
      description: 'Hide the side toolbar on the chart',
    },
    // range: {
    //   type: 'select',
    //   label: 'Range',
    //   default: 'YTD',
    //   options: [
    //     {
    //       value: '1D',
    //       label: '1 Day',
    //     },
    //     {
    //       value: '5D',
    //       label: '5 Days',
    //     },
    //     {
    //       value: '1M',
    //       label: '1 Month',
    //     },
    //     {
    //       value: '3M',
    //       label: '3 Months',
    //     },
    //     {
    //       value: '6M',
    //       label: '6 Months',
    //     },
    //     {
    //       value: 'YTD',
    //       label: 'Year to Date',
    //     },
    //     {
    //       value: '1Y',
    //       label: '1 Year',
    //     },
    //     {
    //       value: '2Y',
    //       label: '2 Years',
    //     },
    //     {
    //       value: '5Y',
    //       label: '5 Years',
    //     },
    //   ],
    //   description: 'The range of the chart',
    // },
    studies: {
      type: 'select',
      label: 'Studies',
      default: [],
      options: [
        {
          value: 'RSI',
          label: 'Relative Strength Index',
        },
        {
          value: 'MACD',
          label: 'Moving Average Convergence Divergence',
        },
        {
          value: 'EMA',
          label: 'Exponential Moving Average',
        },
        {
          value: 'SMA',
          label: 'Simple Moving Average',
        },
      ],
      description: 'The studies to display on the chart',
    },
    details: {
      type: 'boolean',
      label: 'Details',
      default: true,
      description: 'Show details on the chart',
    },
    hide_volume: {
      type: 'boolean',
      label: 'Hide Volume',
      default: false,
      description: 'Hide volume on the chart',
    },
    hotlist: {
      type: 'boolean',
      label: 'Hotlist',
      default: true,
      description: 'Show hotlist on the chart',
    },
    watchlist: {
      type: 'multi-select',
      label: 'Watchlist',
      default: ['BITSTAMP:BTCUSD', 'BITSTAMP:ETHUSD'],
      options: [
        {
          value: 'AAPL',
          label: 'Apple Inc.',
        },
        {
          value: 'GOOGL',
          label: 'Alphabet Inc.',
        },
        {
          value: 'MSFT',
          label: 'Microsoft Corporation',
        },
      ],
      description: 'The watchlist to display on the chart',
    },
    compareSymbols: {
      type: 'select',
      label: 'Compare Symbols',
      default: [],
      options: [
        {
          value: 'AAPL',
          label: 'Apple Inc.',
        },
        {
          value: 'GOOGL',
          label: 'Alphabet Inc.',
        },
        {
          value: 'MSFT',
          label: 'Microsoft Corporation',
        },
      ],
      description: 'The symbols to compare on the chart',
    },
    show_popup_button: {
      type: 'boolean',
      label: 'Show Popup Button',
      default: true,
      description: 'Show the popup button on the chart',
    },
    popup_width: {
      type: 'number',
      label: 'Popup Width',
      default: 800,
      description: 'The width of the popup window',
    },
    popup_height: {
      type: 'number',
      label: 'Popup Height',
      default: 600,
      description: 'The height of the popup window',
    },
  };
</script>
<style></style>
