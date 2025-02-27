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
const { statement } = storeToRefs(accountStore);
const route = useRoute();

const form = reactive({
  account_id: route.params.id,
  date: new Date().toISOString().slice(0, 10),
});

const getStatement = async () => {
  await accountStore.getStatement(form);
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
  getStatement();
})
</script>

<template>
  <Default>
    <main class="px-4">
      <section class="py-2">
        <div class="bg-white rounded-xl px-4 py-2">
          <div class="flex items-center justify-between border-b border-dashed border-gray-300 py-2">
            <div class="flex-grow">
              <h2 class="text-base font-semibold">Account Statement</h2>
            </div>
            <button type="button" @click="getAccountHistoryPrint()"  class="cursor-pointer">
              <IconPrint class="size-5"/>
            </button>
          </div>

          <table class="my-6">
            <thead>
            <tr>
              <th>Sender</th>
              <th>type</th>
              <th>Amount</th>
              <th>Commission</th>
              <th>Reference</th>
            </tr>
            </thead>

            <tbody>
            <template v-if="statement.data">
              <tr v-for="item in statement.data" :key="item.id">
                <td>{{item.sender?.name+' - '+item.receiver?.name ?? 'Other'}}</td>
                <td class="capitalize">{{item.type}}</td>
                <td>{{currency(item.amount)}}</td>
                <td>{{item.commission ?? 'N/A'}}</td>
                <td>{{item.reference ?? 'N/A'}}</td>
              </tr>
            </template>

            <template v-else>
              <p>Loading...</p>
            </template>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </Default>
</template>
