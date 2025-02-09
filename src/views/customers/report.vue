<script setup>
import Default from "@/layouts/Default.vue";
import {onMounted, ref} from "vue";
import BaseButton from "@/components/BaseButton.vue";
import {useCustomerStore} from "@/stores/customer.js";
import {storeToRefs} from "pinia";
import {useRoute} from "vue-router";
import currency from "../../utils/currency.js";

const customerStore = useCustomerStore();
const { customer } = storeToRefs(customerStore);
const route = useRoute();
const report = ref({});

const getReport = async () => {
  report.value = await customerStore.getReport(route.params.id);
}


onMounted(() => {
  getReport();
})
</script>

<template>
  <Default>
    <nav class="flex items-center justify-between">
      <h4 class="font-semibold">Customer Report</h4>
    </nav>

    <section class="py-2">
      <div class="bg-white rounded-xl">
        <template v-if="report.data">
          <table>
            <thead>
            <tr>
              <th>Amount</th>
              <th>created</th>
              <th>Note</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in report.data">
              <td v-if="item.type === 'credit'" class="text-green-500">{{item.amount}}</td>
              <td v-else class="text-red-500">{{item.amount}}</td>
              <td>{{item.created_by?.name}}</td>
              <td>{{item.note}}</td>
            </tr>
            </tbody>
          </table>
        </template>

        <template v-else>
          <p>loading...</p>
        </template>
      </div>
    </section>
  </Default>
</template>
