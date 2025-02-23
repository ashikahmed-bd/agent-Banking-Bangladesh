<script setup>
import {onMounted, reactive, ref} from "vue";
import {useAccountStore} from "@/stores/account.js";
import {storeToRefs} from "pinia";
import BaseButton from "@/components/BaseButton.vue";
import BaseModal from "@/components/BaseModal.vue";

const accountStore = useAccountStore();
const { accounts } = storeToRefs(accountStore);
const getAccountsList = async () => {
  await accountStore.all();
}


const deposit =  reactive({
  account_id: '',
  amount: '',
  profit: '',
});

const withdraw =  reactive({
  account_id: '',
  amount: '',
  profit: '',
});

const accountDeposit = async () => {
  if (!deposit.account_id || !deposit.amount) {
    alert("Please fill in all fields.");
    return;
  }
  await accountStore.depositStore(deposit);
}


const accountWithdraw = async () => {
  if (!withdraw.account_id || !withdraw.amount) {
    alert("Please fill in all fields.");
    return;
  }
  await accountStore.withdrawStore(withdraw);
}

onMounted(() => {
  getAccountsList();
})
</script>

<template>

  <BaseModal :show="accountStore.deposit">
    <div class="flex items-center justify-between border-b border-gray-300 border-dashed mb-3">
      <h2 class="text-lg font-bold mb-4">Deposit</h2>
      <button type="button" class="cursor-pointer text-red-500" @click="accountStore.deposit = false">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <form @submit.prevent="accountDeposit" class="w-full max-w-sm">
      <div class="form__group">
        <label class="form__label">From</label>
        <select v-model="deposit.account_id" class="form__control">
          <option value="" disabled>Select account</option>
          <option :value="account.id" v-for="(account, index) in accounts.data" :key="index">{{account.name}} - {{account.number}}</option>
        </select>
      </div>

      <div class="form__group">
        <label class="form__label">Enter Amount</label>
        <input type="number" v-model="deposit.amount" class="form__control" placeholder="Enter amount"/>
      </div>

      <div class="form__group">
        <label class="form__label">Enter Profit</label>
        <input type="number" v-model="deposit.profit" class="form__control" placeholder="Enter profit"/>
      </div>

      <BaseButton class="w-full" :loading="accountStore.loading">submit</BaseButton>
    </form>
  </BaseModal>

  <BaseModal :show="accountStore.withdraw">
    <div class="flex items-center justify-between border-b border-gray-300 border-dashed mb-3">
      <h2 class="text-lg font-bold mb-4">Withdraw</h2>
      <button type="button" class="cursor-pointer text-red-500" @click="accountStore.withdraw = false">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <form @submit.prevent="accountWithdraw" class="w-full max-w-sm">
      <div class="form__group">
        <label class="form__label">From</label>
        <select v-model="withdraw.account_id" class="form__control">
          <option value="" disabled>Select account</option>
          <option :value="account.id" v-for="(account, index) in accounts.data" :key="index">{{account.name}} - {{account.number}}</option>
        </select>
      </div>

      <div class="form__group">
        <label class="form__label">Enter Amount</label>
        <input type="number" v-model="withdraw.amount" class="form__control" placeholder="Enter amount"/>
      </div>

      <div class="form__group">
        <label class="form__label">Enter Profit</label>
        <input type="number" v-model="withdraw.profit" class="form__control" placeholder="Enter profit"/>
      </div>

      <BaseButton class="w-full" :loading="accountStore.loading">submit</BaseButton>
    </form>
  </BaseModal>

</template>

<style scoped>

</style>