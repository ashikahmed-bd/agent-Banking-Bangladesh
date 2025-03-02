<script setup>
import Default from "@/layouts/Default.vue";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import currency from "../../utils/currency.js";
import IconPrint from "@/components/icons/IconPrint.vue";
import {useAccountStore} from "@/stores/account.js";

const accountStore = useAccountStore();
const {transactions} = storeToRefs(accountStore);

const selectedDate = ref(new Date().toISOString().split('T')[0]);

const getTransactions = async () => {
  await accountStore.getTransactions(selectedDate.value);
}

onMounted(() => {
  getTransactions();
})
</script>

<template>
  <Default>
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
