<script setup>
import {onMounted} from "vue";
import currency from "../utils/currency.js";
import {storeToRefs} from "pinia";
import {useDashboardStore} from "@/stores/dashboard.js";

const dashboardStore = useDashboardStore();

const { balances } = storeToRefs(dashboardStore);


const getAllBalances = async () => {
  await dashboardStore.getAllBalances();
}

onMounted(() => {
  getAllBalances();
});

</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="w-full flex items-center">
      <div class="flex-none h-10 w-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-indigo-500 rounded-full text-white p-2 size-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
        </svg>
      </div>

      <div class="block font-semibold text-base ml-2">
        <span class="block font-semibold">Cash</span>
        <h2 v-if="balances.cash" class="block">{{currency(balances.cash)}}</h2>
        <h2 v-else class="block">Loading...</h2>
      </div>
    </div>

    <div class="w-full flex items-center">
      <div class="flex-none h-10 w-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-orange-500 rounded-full text-white p-2 size-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
        </svg>
      </div>
      <div class="block font-semibold text-base ml-2">
        <span class="block font-semibold">Accounts</span>
        <h2 v-if="balances.accounts" class="block">{{currency(balances.accounts)}}</h2>
        <h2 v-else class="block">Loading...</h2>
      </div>
    </div>

    <div class="w-full flex items-center">
      <div class="flex-none h-10 w-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-green-500 rounded-full text-white p-2 size-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
        </svg>
      </div>
      <div class="block font-semibold text-base ml-2">
        <span class="block font-semibold">Total Due</span>
        <h2 v-if="balances.wallet" class="block text-red-500">{{currency(balances.wallet?.due)}}</h2>
        <h2 v-else class="block">Loading...</h2>
      </div>
    </div>

    <div class="w-full flex items-center">
      <div class="flex-none h-10 w-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-red-500 rounded-full text-white p-2 size-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
        </svg>
      </div>
      <div class="block font-semibold text-base ml-2">
        <span class="block font-semibold">Total Payable</span>
        <h2 v-if="balances.wallet" class="block text-green-500">{{currency(balances.wallet?.payable)}}</h2>
        <h2 v-else class="block">Loading...</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>