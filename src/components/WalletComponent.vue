<script setup>
import {onMounted, ref} from "vue";
import currency from "../utils/currency.js";
import axiosInstance from "@/plugins/axios.js";

const cash = ref(0);
const balance = ref(0);
const wallet = ref({});
const profit = ref({});

const getCash = async () => {
  cash.value = await axiosInstance.get('/api/balance/cash');
}

const getAccountsBalance = async () => {
  balance.value = await axiosInstance.get('/api/balance/accounts');
}

const getWalletBalance = async () => {
  const response = await axiosInstance.get('/api/balance/wallet');
  wallet.value = response.data;
}

const getProfitBalance = async () => {
  const response = await axiosInstance.get('/api/balance/profit');
  profit.value = response.data;
}

onMounted(() => {
  getCash();
  getAccountsBalance();
  getWalletBalance();
  getProfitBalance();
})
</script>

<template>
  <div class="grid grid-cols-2 gap-4 mb-4 border-b border-dashed border-gray-300 py-4">
    <div class="w-full flex items-center">
      <div class="flex-none h-10 w-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-indigo-500 rounded-full text-white p-2 size-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
        </svg>
      </div>

      <div class="block font-semibold text-base ml-2">
        <span class="block font-semibold">Total Cash</span>
        <h2 v-if="cash.data" class="block">{{currency(cash.data)}}</h2>
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
        <span class="block font-semibold">Total Wallet</span>
        <h2 v-if="balance.data" class="block">{{currency(balance.data)}}</h2>
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
        <h2 v-if="wallet.total_due" class="block text-red-500">{{currency(wallet.total_due)}}</h2>
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
        <h2 v-if="wallet.total_payable" class="block text-green-500">{{currency(wallet.total_payable)}}</h2>
        <h2 v-else class="block">Loading...</h2>
      </div>
    </div>

    <div class="w-full flex items-center">
      <div class="flex-none h-10 w-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-rose-500 rounded-full text-white p-2 size-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
        </svg>
      </div>
      <div class="block font-semibold text-base ml-2">
        <span class="block font-semibold">Today Profit</span>
        <h2 v-if="profit.today" class="block">{{currency(profit.today)}}</h2>
        <h2 v-else class="block">Loading...</h2>
      </div>
    </div>

    <div class="w-full flex items-center">
      <div class="flex-none h-10 w-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-emerald-500 rounded-full text-white p-2 size-10">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
        </svg>
      </div>
      <div class="block font-semibold text-base ml-2">
        <span class="block font-semibold">Total Profit</span>
        <h2 v-if="profit.total" class="block">{{currency(profit.total)}}</h2>
        <h2 v-else class="block">Loading...</h2>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>