<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100"
  >
    <UContainer class="py-12 flex flex-col items-center">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <h1
          class="text-4xl md:text-5xl font-extrabold text-indigo-700 drop-shadow mb-4"
        >
          Welcome to <span class="text-blue-500">MarketPred</span>
        </h1>
        <p class="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-6">
          MarketPred is an intuitive algorithmic trading platform designed to
          make automated trading accessible to everyone.
        </p>
        <UButton
          class="mt-4 px-8 py-3 text-lg font-semibold rounded-full shadow-lg bg-gradient-to-r from-indigo-500 to-blue-400 text-white hover:from-blue-600 hover:to-indigo-600 transition"
        >
          Get Started
        </UButton>
      </div>

      <!-- Info Cards -->
      <div class="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        <!-- Project Goals -->
        <section
          class="bg-white/80 rounded-2xl shadow-lg p-8 border border-indigo-100"
        >
          <h2
            class="text-2xl font-bold text-indigo-600 mb-4 flex items-center gap-2"
          >
            <span
              class="i-heroicons-rocket-launch-20-solid text-indigo-400 text-2xl"
            />
            Project Goals
          </h2>
          <ul class="space-y-3 text-gray-700">
            <li>
              <strong>Accessible Algorithmic Trading:</strong> Empower users of
              all skill levels to create, test, and deploy trading bots.
            </li>
            <li>
              <strong>Python-Based Development:</strong> Develop signals and
              strategies using Python, the most popular language for data
              science and finance.
            </li>
            <li>
              <strong>AI Assistance:</strong> Leverage AI to help design and
              optimize trading strategies and signals.
            </li>
            <li>
              <strong>Widget-Based Dashboards:</strong> Build custom dashboards
              using a variety of widgets, from interactive charts to balance
              indicators.
            </li>
            <li>
              <strong>Modular & Flexible:</strong> Combine multiple signals into
              strategies, and strategies into bots, all within a user-friendly
              interface.
            </li>
          </ul>
        </section>

        <!-- Why MarketPred -->
        <section
          class="bg-white/80 rounded-2xl shadow-lg p-8 border border-blue-100 flex flex-col justify-between"
        >
          <h2
            class="text-2xl font-bold text-blue-600 mb-4 flex items-center gap-2"
          >
            <span
              class="i-heroicons-light-bulb-20-solid text-blue-400 text-2xl"
            />
            Why MarketPred?
          </h2>
          <p class="text-gray-700 mb-4">
            Our goal is to lower the barrier to entry for algorithmic trading.
            Whether you're a beginner or an expert, MarketPred provides the
            tools you need to succeed in the markets.
          </p>
          <div class="flex-1"></div>
        </section>
      </div>

      <!-- Get Started Steps -->
      <section
        class="mt-16 w-full max-w-2xl bg-gradient-to-r from-indigo-100 via-white to-blue-100 rounded-2xl shadow p-8 border border-indigo-50"
      >
        <UButton
          to="/trade"
          class="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-2"
        >
          <span
            class="i-heroicons-sparkles-20-solid text-indigo-400 text-2xl"
          />
          Get Started
        </UButton>
        <ol class="list-decimal list-inside space-y-2 text-gray-700 text-lg">
          <li>Create your own dashboard with widgets.</li>
          <li>Develop signals and strategies in Python.</li>
          <li>Deploy and monitor your trading bots with ease.</li>
        </ol>
      </section>
    </UContainer>
  </div>
</template>

<script lang="ts" setup>
  // No script needed for this static landing page
</script>

<style>
  /* Optional: Add a subtle animation or custom styles here */
</style>
