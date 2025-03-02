<script setup>
import Default from "@/layouts/Default.vue";
import {onMounted, ref} from "vue";
import currency from "../utils/currency.js";
import {useAccountStore} from "@/stores/account.js";
import {useCompanyStore} from "@/stores/company.js";
import {storeToRefs} from "pinia";
import IconPrint from "@/components/icons/IconPrint.vue";

const accountStore = useAccountStore();
const companyStore = useCompanyStore();

const {balance, transactions} = storeToRefs(accountStore);
const {companies, companyId} = storeToRefs(companyStore);


const getBalance = async () => {
  await accountStore.getBalance(companyId.value);
}

const selectedDate = ref(new Date().toISOString().split('T')[0]);

const getTransactions = async () => {
  await accountStore.getTransactions(selectedDate.value);
}

onMounted(() => {
  getTransactions();
})

onMounted(() => {
  getBalance();
})
</script>

<template>
  <Default>

    <section class="mb-6">
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-xl">
          <h2 class="text-gray-700 font-bold">Total Balance</h2>
          <div class="text-3xl font-bold text-green-500">
            <span v-if="balance.data">{{currency(balance.data)}}</span>
            <span v-else>Loading...</span>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <article class="bg-green-50 w-full flex items-center p-4 rounded">
              <div class="flex-none h-10 w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-green-500 rounded-full text-green-100 p-2 size-10">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
                </svg>
              </div>
              <div class="block font-semibold text-base ml-2">
                <span class="block font-semibold text-green-700">Today Income</span>
                <h2 class="block text-green-700">{{currency(5622)}}</h2>
              </div>
            </article>

            <article class="bg-red-50 w-full flex items-center p-4 rounded">
              <div class="flex-none h-10 w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-red-500 rounded-full text-red-100 p-2 size-10">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
              <div class="block font-semibold text-base ml-2">
                <span class="block font-semibold text-red-700">Today Expense</span>
                <h2 class="block text-red-700">{{currency(5622)}}</h2>
              </div>
            </article>

          </div>
          <div class="mt-4 flex items-center space-x-4">
            <button class="bg-blue-500 text-white px-4 py-2 rounded">Exchange</button>
            <button class="bg-green-500 text-white px-4 py-2 rounded">Deposit</button>
            <button class="bg-red-500 text-white px-4 py-2 rounded">Withdraw</button>
          </div>
        </div>

        <div class="bg-white p-4 rounded-xl">
          <h2 class="text-gray-700 font-bold">Overview Statistics</h2>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="bg-gray-200 p-4 rounded">
              <p class="text-gray-600">Total Due</p>
              <p class="text-xl font-bold">{{currency(5622)}}</p>
            </div>
            <div class="bg-gray-200 p-4 rounded">
              <p class="text-gray-600">Total Payable</p>
              <p class="text-xl font-bold">{{currency(5622)}}</p>
            </div>
            <article class="bg-red-50 w-full flex items-center p-4 rounded">
              <div class="flex-none h-10 w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-danger rounded-full text-red-100 p-2 size-10">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25" />
                </svg>
              </div>
              <div class="block font-semibold text-base ml-2">
                <span class="block font-semibold text-red-700">Today Due</span>
                <h2 class="block text-red-700">{{currency(5622)}}</h2>
              </div>
            </article>

            <article class="bg-green-50 w-full flex items-center p-4 rounded">
              <div class="flex-none h-10 w-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-green-500 rounded-full text-green-100 p-2 size-10">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
              <div class="block font-semibold text-base ml-2">
                <span class="block font-semibold text-green-700">Today Payable</span>
                <h2 class="block text-green-700">{{currency(5622)}}</h2>
              </div>
            </article>

          </div>
        </div>
      </div>
    </section>

    <!-- Transactions list -->
    <section class="py-2">
      <div class="bg-white rounded-xl p-4">
        <div class="flex items-center justify-between border-b border-dashed border-gray-300 py-4">
          <h3 class="font-semibold text-lg">Transactions</h3>
          <div class="flex items-center gap-2">
            <input type="date" v-model="selectedDate" @change="getTransactions()" class="px-2 py-1 border border-gray-200 focus:border-primary focus:outline-none focus:ring-0 rounded placeholder:text-sm disabled:bg-gray-100 appearance-none">
            <button type="button" class="cursor-pointer">
              <IconPrint class="size-5"/>
            </button>
          </div>
        </div>

        <div class="w-full divide-y divide-dashed divide-gray-200 max-h-[calc(100vh-15rem)] scrollbar overflow-y-auto">
          <article v-for="item in transactions.data" class="py-2  flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img src="/icons/deposit.png" alt="img" class="bg-primary/10 p-1 rounded h-10 w-auto">
              <div>
                <h4 class="mr-2">{{item.sender?.name}} - {{item.receiver?.name ?? 'N/A'}}</h4>
                <small class="capitalize">{{item.type}}</small>
              </div>
            </div>
            <div class="flex-none flex items-center gap-2">
              <div class="flex  items-center gap-2">
                <div class="flex-none text-right">
                  <h4 class="text-gray-700">{{currency(item.amount)}}</h4>
                  <small v-if="item.commission > 0" class="text-green-500">+{{item.commission}}</small>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-primary">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </article>
        </div>
      </div>
    </section>

  </Default>
</template>

<style scoped>

</style>