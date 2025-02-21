<script setup>
import Default from "@/layouts/Default.vue";
import {storeToRefs} from "pinia";
import {onMounted, reactive, ref} from "vue";
import currency from "../utils/currency.js";
import BaseButton from "@/components/BaseButton.vue";
import BaseModal from "@/components/BaseModal.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import {useWalletStore} from "@/stores/wallet.js";
import IconSearch from "@/components/icons/IconSearch.vue";

const walletStore = useWalletStore();
const {wallets} = storeToRefs(walletStore);



const getAccountsList = async () => {
  await walletStore.all();
}

const getBalance = async () => {
  await walletStore.getBalance();
}

const selectedDate = ref(new Date().toISOString().split('T')[0]);


const selectedAccount = ref('');

const form = reactive({
  account_id: selectedAccount,
  amount: '',
  commission: '',
  note: '',
});


const deposit = async () => {
  await walletStore.depositStore(form);
  await getBalance();
  await getAccountsList();
}


const withdraw = async () => {
  await walletStore.withdrawStore(form);
  await getBalance();
  await getAccountsList();
}


const account = reactive({
  name: '',
  number: '',
  balance: '',
});

const addAccount = async () => {
  await walletStore.store(account);
  await getAccountsList();
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
        <div class="flex items-center justify-between border-b border-dashed border-gray-300 py-4">
          <h3 class="font-semibold text-lg">Transactions</h3>
          <div class="flex items-center gap-2">
            <input type="date" v-model="selectedDate" class="px-2 py-1 border border-gray-200 focus:border-primary focus:outline-none focus:ring-0 rounded placeholder:text-sm disabled:bg-gray-100 appearance-none">
            <button type="button" class="cursor-pointer">
              <IconSearch class="size-5"/>
            </button>
          </div>
        </div>

        <div class="w-full divide-y divide-dashed divide-gray-200">
          <RouterLink to="" class="py-2  flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img src="/icons/deposit.png" alt="img" class="bg-primary/10 p-1 rounded h-10 w-auto">
              <h4 class="mr-2">Deposit</h4>
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
