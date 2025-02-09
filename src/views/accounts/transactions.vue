<script setup>
import Default from "@/layouts/Default.vue";
import {onMounted, reactive, ref} from "vue";
import {useAccountStore} from "@/stores/account.js";
import {useCustomerStore} from "@/stores/customer.js";
import {storeToRefs} from "pinia";
import IconPrint from "@/components/icons/IconPrint.vue";
import {useRoute} from "vue-router";
import currency from "../../utils/currency.js";
import Swal from "sweetalert2";

const accountStore = useAccountStore();
const customerStore = useCustomerStore();
const { customers } = storeToRefs(customerStore);
const { transactions } = storeToRefs(accountStore);
const route = useRoute();

const account = ref({});
const date = ref();

const form = reactive({
  account_id: route.params.id,
  date: new Date().toISOString().slice(0, 10),
});

const getAccountTransactions = async () => {
  account.value = await accountStore.getTransactions(form);
}


const getAccountHistoryPrint = async () => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to proceed with downloading the file?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, download it!',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#4513bb',
  });

  if (result.isConfirmed) {
    await accountStore.getTransactionsPrint();
  }
}

onMounted(() => {
  getAccountTransactions();
})
</script>

<template>
  <Default>
    <section class="py-2">
      <div class="bg-white rounded-xl px-4 py-2">
        <div class="flex items-center justify-between border-b border-dashed border-gray-300 py-2">
          <div class="flex-grow">
            <h2 class="text-base font-semibold">Account History</h2>
          </div>
          <button type="button" @click="getAccountHistoryPrint()"  class="cursor-pointer">
            <IconPrint class="size-5"/>
          </button>
        </div>

        <table class="my-6">
          <thead>
          <tr>
            <th>Amount</th>
            <th>Commission</th>
            <th>Type</th>
            <th>created by</th>
          </tr>
          </thead>

          <tbody>
          <template v-if="transactions.data">
            <tr v-for="item in transactions.data" :key="item.id">
              <td>{{currency(item.amount)}}</td>
              <td>{{item.commission ?? 0}}</td>
              <td>{{item.type}}</td>
              <td>{{item.created_by?.name}}</td>
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
