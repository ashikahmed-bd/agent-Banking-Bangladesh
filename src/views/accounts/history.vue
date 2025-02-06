<script setup>
import Default from "@/layouts/Default.vue";
import {onMounted, ref} from "vue";
import {useAccountStore} from "@/stores/account.js";
import {useCustomerStore} from "@/stores/customer.js";
import {storeToRefs} from "pinia";
import IconPrint from "@/components/icons/IconPrint.vue";
import {useRoute} from "vue-router";

const accountStore = useAccountStore();
const customerStore = useCustomerStore();
const { customers } = storeToRefs(customerStore);
const route = useRoute();

const account = ref({});
const date = ref(new Date().toISOString().slice(0, 10));

const getAccountHistory = async () => {
  account.value = await accountStore.getHistory(route.params.id, date.value);
}


const getAccountHistoryPrint = async () => {
  confirm('Are you sure you went to print?')
  {
    await accountStore.getTransactionsPrint();
  }
}

onMounted(() => {
  getAccountHistory();
})
</script>

<template>
  <Default>
    <section class="py-2">
      <div class="bg-white rounded-xl px-4 py-2">
        <div class="flex items-center justify-between border-b border-dashed border-gray-300 py-2">
          <div class="flex-grow">
            <h2 class="text-base font-semibold">Account History</h2>
            <small v-if="account.account">{{account.account?.name}} - {{account.account?.number}}</small>
            <small v-else>loading...</small>
          </div>
          <button type="button" @click="getAccountHistoryPrint()"  class="cursor-pointer">
            <IconPrint class="size-5"/>
          </button>
        </div>

        <table class="my-6">
          <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Profit</th>
            <th>After</th>
          </tr>
          </thead>

          <tbody>
          <template v-if="account.transactions">
            <tr v-for="item in account.transactions" :key="item.id">
              <td>{{item.type}}</td>
              <td>{{item.amount}}</td>
              <td>{{item.profit}}</td>
              <td>{{item.balance_after_transaction}}</td>
            </tr>
          </template>

          <template v-else>
            <p>Loading...</p>
          </template>
          </tbody>
        </table>
      </div>
    </section>
  </Default>
</template>
