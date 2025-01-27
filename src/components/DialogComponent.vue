<script setup>
import {onMounted, reactive, ref} from "vue";
import {useAccountStore} from "@/stores/account.js";
import {storeToRefs} from "pinia";
import BaseButton from "@/components/BaseButton.vue";

const accountStore = useAccountStore();
const { accounts } = storeToRefs(accountStore);
const getAccountsList = async () => {
  await accountStore.all();
}


const deposit =  reactive({
  account_id: '',
  amount: '',
});

const withdraw =  reactive({
  account_id: '',
  amount: '',
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
  <dialog v-if="accountStore.deposit" class="w-full animate__animated animate__slideInUp bg-white bottom-0 fixed flex items-center justify-center max-w-sm mx-auto rounded-t-xl z-50">
    <div class="w-full p-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold mb-4">Deposit</h2>
        <button type="button" class="cursor-pointer" @click="accountStore.deposit = false">
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

        <BaseButton class="w-full" :loading="accountStore.loading">submit</BaseButton>
      </form>
    </div>
  </dialog>


  <dialog v-if="accountStore.withdraw" class="w-full animate__animated animate__slideInUp bg-white bottom-0 fixed flex items-center justify-center max-w-sm mx-auto rounded-t-xl z-50">
    <div class="w-full p-4">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold mb-4">Withdraw</h2>
        <button type="button" class="cursor-pointer" @click="accountStore.withdraw = false">
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

        <BaseButton class="w-full" :loading="accountStore.loading">submit</BaseButton>
      </form>
    </div>
  </dialog>
</template>

<style scoped>

</style>