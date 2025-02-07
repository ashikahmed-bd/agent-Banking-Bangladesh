<script setup>
import Default from "@/layouts/Default.vue";
import {useAccountStore} from "@/stores/account.js";
import {storeToRefs} from "pinia";
import {onMounted, reactive} from "vue";
import currency from "../utils/currency.js";
import BaseButton from "@/components/BaseButton.vue";
import {useWalletStore} from "@/stores/wallet.js";
import BaseModal from "@/components/BaseModal.vue";
import IconPlus from "@/components/icons/IconPlus.vue";

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
});


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


const account = reactive({
  name: '',
  logo: '',
  number: '',
  balance: '',
});

const addAccount = async () => {
  const formData = new FormData();
  formData.append('name', account.name);
  formData.append('number', account.number);
  formData.append('balance', account.balance);
  if (account.logo) {
    formData.append('logo', account.logo);
  }
  await accountStore.store(formData);
}

const onLogoChange = (event) => {
  account.logo = event.target.files[0];
}

onMounted(() => {
  getAccountsList();
  getBalance();
})
</script>

<template>
  <Default>
    <section class="py-2">
      <div class="bg-white rounded-md p-4">
        <div class="flex items-center justify-between mb-4">
          <div class="w-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-primary text-white size-10 p-2 rounded-full">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
            </svg>

            <div class="block font-semibold ml-2">
              <span class="block font-semibold">Total Cash</span>
              <h2 v-if="balance.cash" class="block font-semibold">{{currency(balance.cash)}}</h2>
              <h2 v-else class="block">Loading...</h2>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" @click="walletStore.deposit = true" class="bg-green-500 text-white p-2 rounded cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            <button type="button" @click="walletStore.withdraw = true"  class="bg-red-500 text-white p-2 rounded cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="py-2">
      <div class="bg-white rounded-md p-4">
        <div class="flex items-center justify-between border-b border-dashed border-gray-300 py-4">
          <div class="flex items-center">
            <h3 v-if="balance.accounts" class="font-semibold text-lg">Total Balance: {{currency(balance.accounts)}}</h3>
            <h2 v-else class="block font-semibold text-xl">Loading...</h2>
          </div>
          <button type="button" @click="accountStore.modal = !accountStore.modal" class="bg-primary text-white p-2 rounded-full cursor-pointer">
            <IconPlus class="size-5"/>
          </button>
        </div>

        <div class="w-full divide-y divide-dashed divide-gray-200">
          <RouterLink :to="{name: 'account.show', params: {id: account.id}}" v-for="account in accounts.data" :key="account.id" class="py-2  flex items-center justify-between">
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
          </RouterLink>
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


    <BaseModal :show="accountStore.modal">
      <div class="flex items-center justify-between border-b border-gray-300 border-dashed mb-3">
        <h2 class="text-lg font-bold mb-4">Add Account</h2>
        <button type="button" class="cursor-pointer text-red-500" @click="accountStore.modal = false">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <form @submit.prevent="addAccount()" class="w-full max-w-sm" enctype="multipart/form-data">
        <div class="form__group">
          <label class="form__label">Enter Name</label>
          <input type="text" v-model="account.name" class="form__control" placeholder="Enter name"/>
        </div>
        <div class="form__group">
          <label class="form__label">Number</label>
          <input type="number" v-model="account.number" class="form__control" placeholder="Enter number"/>
        </div>
        <div class="form__group">
          <label class="form__label">Logo</label>
          <input type="file" @input="onLogoChange" class="form__control"/>
        </div>
        <div class="form__group">
          <label class="form__label">Balance</label>
          <input type="number" v-model="account.balance" class="form__control" placeholder="Enter balance"/>
        </div>
        <BaseButton class="w-full" :loading="accountStore.loading">submit</BaseButton>
      </form>
    </BaseModal>

  </Default>
</template>
