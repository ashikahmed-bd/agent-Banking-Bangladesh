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
  <div class="flex items-center gap-4 mb-4">
    <div class="block font-semibold text-base mb-2">
      <span class="block font-semibold text-base">Total Cash</span>
      <h2 class="block font-semibold text-2xl">{{currency(balance.cash)}}</h2>
    </div>

    <div class="block font-semibold text-base mb-2">
      <span class="block font-semibold text-base">Total Wallet</span>
      <h2 class="block font-semibold text-2xl">{{currency(balance.wallet)}}</h2>
    </div>
  </div>
</template>

<style scoped>

</style>