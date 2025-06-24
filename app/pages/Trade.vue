<template>
  <div class="w-full h-full">
    <!-- <Dashboard title="Home" /> -->
    <!-- <Dragize :widgets="widgets" /> -->

    <!-- <TickerTape :options="TickerTapeOptions" /> -->
    <div class="gap-4 p-4 h-full flex flex-wrap" id="widgetContainer">
      <!-- <Widget title="Overview">
        <MarketOverview />
      </Widget> -->
      <Chart />
      <CompanyProfile />
      <CryptoHeatMap />
      <EconomicCalendar />
      <ForexCrossRates />
      <ForexHeatMap />
      <FundamentalData />
      <MarketData />
      <MarketOverview />
      <MiniChart />
      <Screener />
      <SingleTicker />
      <StockMarket />
      <StockMarketHeatMap />
      <SymbolInfo />
      <SymbolOverview />
      <TechnicalAnalysis />
      <Ticker />
      <TickerTape />
      <TopStories />
      <!-- <h2 v-dragize="{ drag: false }" class="bg-red-50">hello</h2>

      <h2 v-dragize="{ resize: false }" class="bg-blue-50">hello</h2>
      <h2 v-dragize class="bg-green-50">hello</h2> -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    Chart,
    EconomicCalendar,
    MarketOverview,
    TopStories,
  } from '#components';
  import type { WidgetI } from '#components/Dragize.vue';
  const colorMode = useColorMode();

  const dragizeOptions = reactive({
    edit: false,
  });
  const watchlist = [
    'FX:EURUSD',
    'FX:USDJPY',
    'FX:GBPUSD',
    'FX:USDCHF',
    'FX:AUDUSD',
    'FX:USDCAD',
    'FX:NZDUSD',
  ];

  const widgets = ref<WidgetI[]>([
    {
      slot: 'tradingview-chart',
      position: [0, 0],
      size: [100, 100],
      component: TopStories,
    },
    {
      slot: 'economic-calendar',
      position: [0, 0],
      size: [100, 100],
      component: Chart,
    },
    {
      slot: 'top-stories',
      size: [100, 100],
      position: [0, 0],
      component: TopStories,
    },
  ]);

  const TickerTapeOptions = {
    symbols: watchlist.map((symbol) => ({
      displaySymbol: symbol,
      proName: symbol,
      title: symbol,
    })),
    colorTheme: colorMode.value,
  };
</script>
