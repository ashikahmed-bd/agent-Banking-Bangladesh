<script setup>
import {onMounted, ref} from "vue";
import {useAccountStore} from "@/stores/account.js";
import currency from "../utils/currency.js";

const accountStore = useAccountStore();

const balance = ref('');

const getAccountsList = async () => {
  balance.value = await accountStore.getBalance();
}

onMounted(() => {
  getAccountsList();
})
</script>

<template>
  <div class="block font-semibold text-base mb-2">
    <span class="block font-semibold text-base">Total Balance</span>
    <template v-if="balance.balance">
      <h2 class="block font-semibold text-2xl">{{currency(balance.balance)}}</h2>
    </template>
    <template v-else>
      <span>Loading...</span>
    </template>

  </div>
</template>

<style scoped>

</style>