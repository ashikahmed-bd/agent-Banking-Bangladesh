<script setup>
import Default from "@/layouts/Default.vue";
import {useAccountStore} from "@/stores/account.js";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
import currency from "../utils/currency.js";

const accountStore = useAccountStore();
const {accounts, balance} = storeToRefs(accountStore);

const getAccountsList = async () => {
  await accountStore.all();
}

const getBalance = async () => {
  await accountStore.getBalance();
}

onMounted(() => {
  getAccountsList();
  getBalance();
})
</script>

<template>
  <Default>
    <section class="bg-gray-100 p-2">
      <div class="bg-white rounded-md p-4">
        <div class="flex items-center justify-between mb-4">
          <div class="w-full flex items-center">
            <img src="/cash.png" alt="cash" class="h-10 w-auto">
            <div class="block font-semibold text-base ml-2">
              <span class="block font-semibold text-base">Total Cash</span>
              <h2 class="block font-semibold text-xl">{{currency(balance.cash)}}</h2>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" class="bg-green-500 text-white px-6 py-1.5 rounded-md cursor-pointer">Credit</button>
            <button type="button" class="bg-red-500 text-white px-6 py-1.5 rounded-md cursor-pointer">Debit</button>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gray-100 p-2">
      <div class="bg-white rounded-md p-4">
        <h3 class="font-semibold text-base">Total Balance: {{currency(balance.wallet)}}</h3>
        <div class="w-full divide-y divide-dashed divide-gray-200">
          <a href="#" v-for="account in accounts.data" :key="account.id" class="py-2  flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img :src="account.logo_url" alt="img" class="h-8 w-auto">
              <div class="mr-2">
                <strong>{{account.name}}</strong>
                <p class="text-xs">{{account.number}}</p>
              </div>
            </div>
            <div class="flex-none">
              <span class="text-primary">{{currency(account.balance)}}</span>
            </div>
          </a>
        </div>
      </div>
    </section>

  </Default>
</template>
