<script setup>
import Default from "@/layouts/Default.vue";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
import currency from "../utils/currency.js";
import IconDown from "@/components/icons/IconDown.vue";
import IconUp from "@/components/icons/IconUp.vue";
import {useAccountStore} from "@/stores/account.js";

const accountStore = useAccountStore();
const {accounts} = storeToRefs(accountStore);


const getAccounts = async () => {
  await accountStore.all();
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
          <div class="flex items-center justify-between border-b border-dashed border-gray-300 py-4">
            <h3 class="font-semibold text-lg">Accounts List</h3>
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
    </main>
  </Default>
</template>
