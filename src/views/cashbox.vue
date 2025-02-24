<script setup>
import Default from "@/layouts/Default.vue";
import {storeToRefs} from "pinia";
import {onMounted, reactive, ref} from "vue";
import currency from "../utils/currency.js";
import IconDown from "@/components/icons/IconDown.vue";
import IconUp from "@/components/icons/IconUp.vue";
import {useAccountStore} from "@/stores/account.js";
import IconPrint from "@/components/icons/IconPrint.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import BaseModal from "@/components/BaseModal.vue";
import BaseButton from "@/components/BaseButton.vue";
import {usePaymentStore} from "@/stores/payment.js";

const accountStore = useAccountStore();
const paymentStore = usePaymentStore();
const {accounts} = storeToRefs(accountStore);


const getAccounts = async () => {
  await accountStore.all();
}


const selectedDeposit = ref('');
const selectedWithdraw = ref('');
const selectedType = ref('');

const form = reactive({
  name: '',
  number: '',
  opening_balance: '',
});

const onSubmit = async () => {
  await accountStore.store(form);
  form.name = '';
  form.number = '';
  form.opening_balance = '';
}

const deposit = reactive({
  account_id: selectedDeposit,
  amount: '',
  reference: '',
  remark: '',
});

const depositStore = async () => {
  await paymentStore.depositStore(deposit);
  deposit.account_id = '';
  deposit.amount = '';
  deposit.reference = '';
  deposit.remark = '';
  await getAccounts();
}

const withdraw = reactive({
  account_id: selectedWithdraw,
  amount: '',
  type: selectedType,
  remark: '',
});
const withdrawStore = async () => {
  await paymentStore.withdrawStore(withdraw);
  withdraw.account_id = '';
  withdraw.amount = '';
  withdraw.type = '';
  withdraw.remark = '';
  await getAccounts();
}

onMounted(() => {
  getAccounts();
})
</script>

<template>
  <Default>
    <main class="px-4">
      <section class="py-2">
        <div class="bg-white rounded-2xl p-4">
          <div class="grid grid-cols-2 gap-4">
            <article class="w-full flex items-center">
              <div class="flex-none h-10 w-auto">
                <IconDown class="bg-success rounded-full text-white p-2 size-10"/>
              </div>
              <div class="block font-semibold text-base ml-2">
                <span class="block font-semibold">Income</span>
                <h2 v-if="true" class="block">{{currency(5622)}}</h2>
                <h2 v-else class="block">Loading...</h2>
              </div>
            </article>

            <article class="w-full flex items-center">
              <div class="flex-none h-10 w-auto">
                <IconUp class="bg-danger rounded-full text-white p-2 size-10"/>
              </div>
              <div class="block font-semibold text-base ml-2">
                <span class="block font-semibold">Expense</span>
                <h2 v-if="true" class="block">{{currency(5622)}}</h2>
                <h2 v-else class="block">Loading...</h2>
              </div>
            </article>

            <article class="w-full flex items-center">
              <div class="flex-none h-10 w-auto">
                <IconUp class="bg-danger rounded-full text-white p-2 size-10"/>
              </div>
              <div class="block font-semibold text-base ml-2">
                <span class="block font-semibold">Deposit</span>
                <h2 v-if="true" class="block">{{currency(5622)}}</h2>
                <h2 v-else class="block">Loading...</h2>
              </div>
            </article>

            <article class="w-full flex items-center">
              <div class="flex-none h-10 w-auto">
                <IconUp class="bg-danger rounded-full text-white p-2 size-10"/>
              </div>
              <div class="block font-semibold text-base ml-2">
                <span class="block font-semibold">Withdraw</span>
                <h2 v-if="true" class="block">{{currency(5622)}}</h2>
                <h2 v-else class="block">Loading...</h2>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="py-2">
        <div class="bg-white rounded-2xl p-4">
          <div class="flex items-center justify-between">
            <button type="button" @click="paymentStore.deposit = true" class="cursor-pointer bg-green-500 text-white px-4 py-2 rounded">
              Deposit
            </button>
            <button type="button" @click="paymentStore.withdraw = true" class="cursor-pointer bg-red-500 text-white px-4 py-2 rounded">
              Withdraw
            </button>
          </div>
        </div>
      </section>

      <section class="py-2">
        <div class="bg-white rounded-2xl p-4">
          <div class="flex items-center justify-between border-b border-dashed border-gray-300 py-4">
            <h3 class="font-semibold text-lg">Accounts List</h3>
            <div class="flex items-center gap-2">
              <button type="button" @click="accountStore.modal = !accountStore.modal" class="bg-red-50 p-2 rounded-full cursor-pointer">
                <IconPlus class="size-5"/>
              </button>
              <button type="button" class="bg-red-50 p-2 rounded-full cursor-pointer">
                <IconPrint class="size-5"/>
              </button>
            </div>
          </div>

          <div class="w-full divide-y divide-dashed divide-gray-200 max-h-[calc(100vh-21rem)] scrollbar overflow-y-auto">
            <template v-if="accounts.data">
              <RouterLink to="" v-for="account in accounts.data" class="py-2  flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <img src="/icons/deposit.png" alt="img" class="bg-primary/10 p-1 rounded h-10 w-auto">
                  <div>
                    <h4 class="mr-2">{{account.name}}</h4>
                    <small>{{account.number}}</small>
                  </div>
                </div>
                <div class="flex-none flex items-center gap-2">
                  <div class="flex  items-center gap-2">
                    <div class="flex-none text-right">
                      <h4 class="text-green-500">{{currency(account.current_balance)}}</h4>
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-primary">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </RouterLink>
            </template>

            <template v-else>
              <p>loading...</p>
            </template>
          </div>
        </div>
      </section>

      <BaseModal :show="accountStore.modal">
        <div class="flex justify-between items-center border-b border-gray-300 border-dashed pb-3">
          <h2 class="text-xl font-semibold">Add Account</h2>
          <button type="button" class="cursor-pointer text-red-500" @click="accountStore.modal = false">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="mt-4">
          <form @submit.prevent="onSubmit" class="w-full max-w-sm">
            <div class="form__group">
              <label class="form__label">Name</label>
              <input type="text" v-model="form.name" class="form__control" placeholder="Enter name"/>
            </div>
            <div class="form__group">
              <label class="form__label">Number</label>
              <input type="tel" v-model="form.number" class="form__control" placeholder="Enter number"/>
            </div>

            <div class="form__group">
              <label class="form__label">Opening Balance</label>
              <input type="number" v-model="form.opening_balance" class="form__control" placeholder="Enter balance"/>
            </div>
            <BaseButton class="w-full bg-primary text-white" :loading="accountStore.loading">submit</BaseButton>
          </form>
        </div>
      </BaseModal>

      <BaseModal :show="paymentStore.deposit">
        <div class="flex justify-between items-center border-b border-gray-300 border-dashed pb-3">
          <h2 class="text-xl font-semibold">Deposit</h2>
          <button type="button" class="cursor-pointer text-red-500" @click="paymentStore.deposit = false">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="mt-4">
          <form @submit.prevent="depositStore" class="w-full max-w-sm">
            <div class="form__group">
              <label class="form__label">Select Account</label>
              <select v-model="selectedDeposit" class="form__control">
                <option value="">Select option</option>
                <option :value="account.id" v-for="account in accounts.data" :key="account.id">{{account.name+ ' - '+account.number}}</option>
              </select>
            </div>
            <div class="form__group">
              <label class="form__label">Amount</label>
              <input type="number" v-model="deposit.amount" class="form__control" placeholder="Enter amount"/>
            </div>
            <div class="form__group">
              <label class="form__label">Reference</label>
              <input type="text" v-model="deposit.reference" class="form__control" placeholder="Enter reference"/>
            </div>
            <div class="form__group">
              <label class="form__label">Remark</label>
              <input type="text" v-model="deposit.remark" class="form__control" placeholder="Enter remark"/>
            </div>
            <BaseButton class="w-full bg-primary text-white" :loading="paymentStore.loading">submit</BaseButton>
          </form>
        </div>
      </BaseModal>

      <BaseModal :show="paymentStore.withdraw">
        <div class="flex justify-between items-center border-b border-gray-300 border-dashed pb-3">
          <h2 class="text-xl font-semibold">Withdraw</h2>
          <button type="button" class="cursor-pointer text-red-500" @click="paymentStore.withdraw = false">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="mt-4">
          <form @submit.prevent="withdrawStore" class="w-full max-w-sm">
            <div class="form__group">
              <label class="form__label">Select Account</label>
              <select v-model="selectedWithdraw" class="form__control">
                <option value="">Select option</option>
                <option :value="account.id" v-for="account in accounts.data" :key="account.id">{{account.name+ ' - '+account.number}}</option>
              </select>
            </div>
            <div class="form__group">
              <label class="form__label">Amount</label>
              <input type="number" v-model="withdraw.amount" class="form__control" placeholder="Enter amount"/>
            </div>
            <div class="form__group">
              <label class="form__label">Type</label>
              <select v-model="selectedType" class="form__control">
                <option value="">Select option</option>
                <option value="withdraw">Withdraw</option>
                <option value="bill">Bill</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div class="form__group">
              <label class="form__label">Remark</label>
              <input type="text" v-model="withdraw.remark" class="form__control" placeholder="Enter remark"/>
            </div>
            <BaseButton class="w-full bg-primary text-white" :loading="paymentStore.loading">submit</BaseButton>
          </form>
        </div>
      </BaseModal>

    </main>



  </Default>
</template>
