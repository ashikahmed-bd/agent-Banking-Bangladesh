<script setup>
import Default from "@/layouts/Default.vue";
import {useAccountStore} from "@/stores/account.js";
import {storeToRefs} from "pinia";
import {onMounted, reactive} from "vue";
import currency from "../utils/currency.js";
import BaseButton from "@/components/BaseButton.vue";
import {useWalletStore} from "@/stores/wallet.js";
import BaseModal from "@/components/BaseModal.vue";

const accountStore = useAccountStore();
const walletStore = useWalletStore();
const {accounts, balance} = storeToRefs(accountStore);

const getAccountsList = async () => {
  await accountStore.all();
}

const getBalance = async () => {
  await accountStore.getBalance();
}

const form = reactive({
  amount: '',
  note: '',
})


const cashDeposit = async () => {
  await walletStore.getDeposit(form);
  await getBalance();
  // Reset the form after submission
  form.amount = '';
  form.note = '';
}


const cashWithdraw = async () => {
  await walletStore.getWithdraw(form);
  await getBalance();
  // Reset the form after submission
  form.amount = ''
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
            <button type="button" @click="walletStore.deposit = true" class="bg-green-500 text-white px-6 py-1.5 rounded-md cursor-pointer">Credit</button>
            <button type="button" @click="walletStore.withdraw = true"  class="bg-red-500 text-white px-6 py-1.5 rounded-md cursor-pointer">Debit</button>
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

    <BaseModal :show="walletStore.deposit">
      <div class="flex items-center justify-between border-b border-gray-300 border-dashed mb-3">
        <h2 class="text-lg font-bold mb-4">Cash Deposit</h2>
        <button type="button" class="cursor-pointer text-red-500" @click="walletStore.deposit = false">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <form @submit.prevent="cashDeposit" class="w-full max-w-sm">
        <div class="form__group">
          <label class="form__label">Enter Amount</label>
          <input type="number" v-model="form.amount" class="form__control" placeholder="Enter amount"/>
        </div>
        <div class="form__group">
          <label class="form__label">Note</label>
          <input type="text" v-model="form.note" class="form__control" placeholder="Enter note"/>
        </div>
        <BaseButton class="w-full" :loading="walletStore.loading">submit</BaseButton>
      </form>
    </BaseModal>


    <BaseModal :show="walletStore.withdraw">
      <div class="flex items-center justify-between border-b border-gray-300 border-dashed mb-3">
        <h2 class="text-lg font-bold mb-4">Cash Withdraw</h2>
        <button type="button" class="cursor-pointer text-red-500" @click="walletStore.withdraw = false">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <form @submit.prevent="cashWithdraw" class="w-full max-w-sm">
        <div class="form__group">
          <label class="form__label">Enter Amount</label>
          <input type="number" v-model="form.amount" class="form__control" placeholder="Enter amount"/>
        </div>
        <div class="form__group">
          <label class="form__label">Note</label>
          <input type="text" v-model="form.note" class="form__control" placeholder="Enter note"/>
        </div>
        <BaseButton class="w-full" :loading="walletStore.loading">submit</BaseButton>
      </form>
    </BaseModal>

  </Default>
</template>
