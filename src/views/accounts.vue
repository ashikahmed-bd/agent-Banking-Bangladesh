<script setup>
import Default from "@/layouts/Default.vue";
import WalletComponent from "@/components/WalletComponent.vue";
import {useAccountStore} from "@/stores/account.js";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
import currency from "../utils/currency.js";

const accountStore = useAccountStore();
const {accounts} = storeToRefs(accountStore);

const getAccountsList = async () => {
  await accountStore.all();
}


onMounted(() => {
  getAccountsList();
})
</script>

<template>
  <Default>
    <section class="bg-gray-100 p-2">
      <div class="bg-white rounded-md p-4">
        <WalletComponent/>
      </div>
    </section>

    <section class="bg-gray-100 p-2">
      <div class="bg-white rounded-md p-4">
        <h3 class="font-semibold text-base">Account List</h3>
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

  </Default>
</template>
