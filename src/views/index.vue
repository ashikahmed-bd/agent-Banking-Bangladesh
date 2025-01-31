<script setup>

import Default from "@/layouts/Default.vue";
import {onMounted, ref} from "vue";
import { Carousel, Slide} from 'vue3-carousel'
import {useAccountStore} from "@/stores/account.js";
import {storeToRefs} from "pinia";
import currency from "../utils/currency.js";
import WalletComponent from "@/components/WalletComponent.vue";
import DialogComponent from "@/components/DialogComponent.vue";
import IconReload from "@/components/icons/IconReload.vue";

const accountStore = useAccountStore();
const {accounts} = storeToRefs(accountStore);

const transactions = ref({});
const deposit = () => {
  accountStore.deposit = true;
}
const withdraw = () => {
  accountStore.withdraw = true;
}
const carouselConfig = {
  itemsToShow: 2,
  wrapAround: true,
  gap: 10
}

const getAccountsList = async () => {
  await accountStore.all();
}

const latestTransactions = async () => {
  transactions.value = await accountStore.getLatestTransactions();
}

const reloadTransactions = async () => {
  transactions.value = await accountStore.getLatestTransactions();
}

onMounted(() => {
  getAccountsList();
  latestTransactions();
})
</script>

<template>
  <Default>
    <section class="px-4 py-4">
      <div class="bg-white rounded-xl shadow-2xl p-4">
        <WalletComponent/>
        <div class="flex items-center justify-between">
          <button type="button" @click="deposit" class="bg-primary text-white px-6 py-1.5 rounded-md cursor-pointer">Deposit</button>
          <button type="button" @click="withdraw" class="bg-red-500 text-white px-6 py-1.5 rounded-md cursor-pointer">Withdraw</button>
        </div>
      </div>
    </section>

    <section class="px-4 py-2">
      <div class="@container">
        <Carousel v-bind="carouselConfig">
          <Slide v-for="account in accounts.data" :key="account.id">
            <div class="carousel__item overflow-hidden z-10 relative gap-4">
              <img alt="card" src="/wallet-bg.png" class="object-cover rounded-xl">
              <div class="min-h-full flex flex-col absolute top-0 p-2.5">
                <div class="flex-1 text-white">
                  <h3 class="font-semibold">{{account.name}}</h3>
                  <small class="font-semibold">{{currency(account.balance)}}</small>
                </div>
              </div>
            </div>
          </Slide>
        </Carousel>
      </div>
    </section>

    <section class="px-4 py-4 flex flex-col flex-grow">
      <div class="bg-white rounded-xl shadow-2xl">
        <div class="flex items-center justify-between p-4 border-b border-gray-300 border-dashed">
          <h3 class="flex items-center gap-2 font-semibold text-base">
            Latest transactions
            <button type="button" @click="reloadTransactions()" class="cursor-pointer text-primary">
              <IconReload :loading="accountStore.loading"/>
            </button>
          </h3>
          <a href="#" class="text-right text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>

        <div class="w-full px-4 divide-y divide-dashed divide-gray-200 max-h-2xl overflow-y-auto">
          <template v-if="transactions.data">
            <a href="#" v-for="item in transactions.data" class="py-2 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img :src="item.account?.logo_url" alt="img" class="h-8 w-auto">
                <div class="mr-2">
                  <strong>{{item.account?.name}}</strong>
                  <p class="text-xs">{{item.account?.number}}</p>
                </div>
              </div>
              <div class="flex-none">
                <span v-if="item.type === 'credit'" class="text-green-500">{{currency(item.amount)}}</span>
                <span v-if="item.type === 'debit'" class="text-red-500">{{currency(item.amount)}}</span>
              </div>
            </a>
          </template>

          <template v-else>
            <div v-for="item in 5" role='status' class='flex max-w-full animate-pulse'>
              <div class='flex-shrink-0'>
                <span class='flex justify-center items-center bg-gray-300 w-12 h-12 '></span>
              </div>
              <div class='ml-4 mt-2 w-full'>
                <h3 class='h-3 bg-gray-300 rounded-full w-90 mb-4'></h3>
                <p class='h-2 bg-gray-300 rounded-full w-80 mb-2.5'></p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>

    <DialogComponent/>

  </Default>
</template>

<style scoped>

</style>