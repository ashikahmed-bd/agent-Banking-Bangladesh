<script setup>

import Default from "@/layouts/Default.vue";
import {onMounted, reactive, ref} from "vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import currency from "@/utils/currency.js";
import BaseButton from "@/components/BaseButton.vue";
import {useCustomerStore} from "@/stores/customer.js";
import BaseModal from "@/components/BaseModal.vue";
import {storeToRefs} from "pinia";
import {useRoute} from "vue-router";

const customerStore = useCustomerStore();
const { customers } = storeToRefs(customerStore);
const route = useRoute();

const limit = ref(10)

const getCustomers = async () => {
  await customerStore.all(limit.value);
}

const form = reactive({
  customer_id: route.params.id,
  receivable: '',
  payable: '',
  note: '',
});

const onSubmit = async () => {
  await customerStore.store(form);
  form.receivable = '';
  form.payable = '';
  form.note = '';
  await getCustomers();
}



onMounted(() => {
  getCustomers();
})
</script>

<template>
  <Default>
    <section class="bg-gray-100 px-4 py-2">
      <div class="bg-white rounded-xl px-4 py-2">
        <div class="flex items-center justify-between border-b border-dashed border-gray-300 py-2">
          <div class="flex-grow">
            <p v-if="true" class="text-green-500">Amount: 1200</p>
            <p v-else class="text-red-500">Amount: 1200</p>
            <time class="text-sm">Date: 12 Nov 2025</time>
          </div>
          <RouterLink to="/" class="bg-primary text-white px-4 py-1.5 rounded">Report</RouterLink>
        </div>


        <div class="w-full mt-4">
          <form class="w-full grid grid-cols-2 gap-4">
            <div class="form__group">
              <label class="form__label">Paid Amount</label>
              <input type="number" v-model="form.receivable" class="form__control" placeholder="Enter paid amount"/>
            </div>
            <div class="form__group">
              <label class="form__label">Due Amount</label>
              <input type="number" v-model="form.payable" class="form__control" placeholder="Enter due amount"/>
            </div>
            <div class="form__group col-span-2">
              <label class="form__label">Note</label>
              <input type="text" v-model="form.note" class="form__control" placeholder="Enter note"/>
            </div>
            <BaseButton class="w-full col-span-2" :loading="customerStore.loading">submit</BaseButton>
          </form>
        </div>
      </div>
    </section>
  </Default>
</template>
