<script setup>
import {onMounted, ref} from "vue";
import {useAccountStore} from "@/stores/account.js";
import currency from "../utils/currency.js";
import {storeToRefs} from "pinia";

const accountStore = useAccountStore();
const {balance} = storeToRefs(accountStore);



const getBalance = async () => {
  await accountStore.getBalance();
}

onMounted(() => {
  getBalance();
})
</script>

<template>
  <div class="flex items-center justify-between mb-4">
    <div class="w-full flex items-center">
      <img src="/cash.png" alt="cash" class="h-10 w-auto">
      <div class="block font-semibold text-base ml-2">
        <span class="block font-semibold text-base">Total Cash</span>
        <h2 class="block font-semibold text-xl">{{currency(balance.cash)}}</h2>
      </div>
    </div>

    <div class="w-full flex items-center">
      <img src="/cash.png" alt="cash" class="h-10 w-auto">
      <div class="block font-semibold text-base ml-2">
        <span class="block font-semibold text-base">Total Wallet</span>
        <h2 class="block font-semibold text-xl">{{currency(balance.wallet)}}</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>