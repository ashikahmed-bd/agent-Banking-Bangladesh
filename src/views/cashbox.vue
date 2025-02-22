<script setup>
import Default from "@/layouts/Default.vue";
import {storeToRefs} from "pinia";
import {onMounted, reactive, ref} from "vue";
import currency from "../utils/currency.js";
import {useCashStore} from "@/stores/cash.js";
import IconDown from "@/components/icons/IconDown.vue";
import IconUp from "@/components/icons/IconUp.vue";
import IconPrint from "@/components/icons/IconPrint.vue";
import IconSearch from "@/components/icons/IconSearch.vue";

const cashStore = useCashStore();
const {loading} = storeToRefs(cashStore);


const getBalance = async () => {
  await cashStore.getBalance();
}

const selectedDate = ref(new Date().toISOString().split('T')[0]);

const form = reactive({
  date: selectedDate,
});

onMounted(() => {
  getBalance();
})
</script>

<template>
  <Default>
    <section class="py-2">
      <div class="bg-white rounded-md p-4">
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
      <div class="bg-white rounded-md p-4">
        <div class="flex items-center justify-between border-b border-dashed border-gray-300 py-4">
          <h3 class="font-semibold text-lg">Wallet List</h3>
        </div>

        <div class="w-full divide-y divide-dashed divide-gray-200">
          <RouterLink to="" class="py-2  flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img src="/icons/deposit.png" alt="img" class="bg-primary/10 p-1 rounded h-10 w-auto">
              <div>
                <h4 class="mr-2">Bkash</h4>
                <small>019251154</small>
              </div>
            </div>
            <div class="flex-none flex items-center gap-2">
              <div class="flex  items-center gap-2">
                <div class="flex-none text-right">
                  <h4 class="text-green-500">{{currency(500)}}</h4>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-primary">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </RouterLink>

          <RouterLink to="" class="py-2  flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img src="/icons/deposit.png" alt="img" class="bg-primary/10 p-1 rounded h-10 w-auto">
              <div>
                <h4 class="mr-2">Nagad</h4>
                <small>019251154</small>
              </div>
            </div>
            <div class="flex-none flex items-center gap-2">
              <div class="flex  items-center gap-2">
                <div class="flex-none text-right">
                  <h4 class="text-green-500">{{currency(500)}}</h4>
                </div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-primary">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </RouterLink>

        </div>
      </div>
    </section>

  </Default>
</template>
