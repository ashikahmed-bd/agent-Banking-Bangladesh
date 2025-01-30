<script setup>

import Default from "@/layouts/Default.vue";
import {onMounted, ref} from "vue";
import { Carousel, Slide} from 'vue3-carousel'
import {useAccountStore} from "@/stores/account.js";
import {storeToRefs} from "pinia";
import currency from "../utils/currency.js";
import WalletComponent from "@/components/WalletComponent.vue";
import DialogComponent from "@/components/DialogComponent.vue";

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
  itemsToShow: 3,
  wrapAround: true,
  gap: 10
}

const getAccountsList = async () => {
  await accountStore.all();
}

const latestTransactions = async () => {
  transactions.value = await accountStore.getTransactions();
}


onMounted(() => {
  getAccountsList();
  latestTransactions();
})
</script>

<template>
  <Default>
    <section class="bg-gray-100 p-2">
      <div class="bg-white rounded-md p-4">
        <WalletComponent/>
        <div class="flex items-center justify-between">
          <button type="button" @click="deposit" class="bg-indigo-500 text-white px-6 py-1.5 rounded-md cursor-pointer">Deposit</button>
          <button type="button" @click="withdraw" class="bg-red-500 text-white px-6 py-1.5 rounded-md cursor-pointer">Withdraw</button>
        </div>
      </div>
    </section>

    <section class="bg-white p-2">
      <Carousel v-bind="carouselConfig">
        <Slide v-for="account in accounts.data" :key="account.id">
          <div class="carousel__item relative gap-4">
            <img alt="card" :src="account.banner_url" class="object-cover">
            <div class="min-h-full flex flex-col absolute top-0 p-2.5">
              <div class="flex-1">
                <h3 class="font-semibold">{{account.name}}</h3>
                <small class="font-semibold">{{currency(account.balance)}}</small>
              </div>
            </div>
          </div>
        </Slide>
      </Carousel>
    </section>

    <section class="bg-gray-100 p-4">
      <div class="flex items-center justify-between py-2">
        <h3 class="font-semibold text-base">Latest transactions</h3>
        <a href="#" class="text-right text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </a>
      </div>

      <div class="w-full bg-white">
        <template v-if="transactions.data">
          <a href="#" v-for="item in transactions.data" class="p-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img src="/account/city.png" alt="img" class="h-8 w-auto">
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
          <p>Wait...</p>
        </template>

      </div>
    </section>

    <DialogComponent/>
  </Default>
</template>
