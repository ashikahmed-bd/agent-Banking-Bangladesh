<script setup>
import Default from "@/layouts/Default.vue";
import {onMounted, reactive, ref} from "vue";
import BaseButton from "@/components/BaseButton.vue";
import {useCustomerStore} from "@/stores/customer.js";
import {storeToRefs} from "pinia";
import {useRoute, useRouter} from "vue-router";
import currency from "../../utils/currency.js";
import Swal from "sweetalert2";

const customerStore = useCustomerStore();
const { customer } = storeToRefs(customerStore);
const route = useRoute();
const router = useRouter();


const getCustomer = async () => {
  await customerStore.show(route.params.id);
}

const form = reactive({
  customer_id: route.params.id,
  due: '',
  payable: '',
  note: '',
});

const onSubmit = async () => {
  await customerStore.payment(form);
  form.due = '';
  form.payable = '';
  form.note = '';
  await getCustomer();
}

const customerDeleted = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'You won’t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#00dc82',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
    await customerStore.delete(id);
    await router.push({name: 'customers'})
  }
  console.log(id);
}

onMounted(() => {
  getCustomer();
})
</script>

<template>
  <Default>
    <nav class="flex items-center justify-between">
      <h4 class="font-semibold">Customer Details</h4>
      <div class="flex items-center gap-2">
        <RouterLink :to="{name: 'customer.report', params: {id: route.params.id}}" class="bg-primary text-white px-3 py-1 rounded">Report</RouterLink>
        <button type="button" @click.prevent="customerDeleted(route.params.id)" class="bg-danger text-white rounded cursor-pointer px-3 py-1">
          Delete
        </button>
      </div>
    </nav>

    <section class="py-2">
      <div class="bg-white rounded-xl px-4 py-2">
        <div class="flex items-center justify-between border-b border-dashed border-gray-300 py-2">
          <div class="flex-grow">
            <div class="flex items-center gap-2">
              <span>Amount:</span>
              <p v-if="customer.balance > 0" class="text-green-500">{{currency(customer.balance)}}</p>
              <p v-else-if="customer.balance === 0" class="text-gray-500">{{currency(customer.balance)}}</p>
              <p v-else class="text-red-500">{{currency(customer.balance)}}</p>
            </div>
            <time class="text-sm">{{customer.updated_at}}</time>
          </div>
          <div class="">
            <h2>{{customer.name}}</h2>
            <small>Phone: {{customer.phone}}</small>
          </div>
        </div>
        <div class="w-full mt-4">
          <form @submit.prevent="onSubmit" class="w-full grid grid-cols-2 gap-4">
            <div class="form__group">
              <label class="form__label">Due Amount</label>
              <input type="number" v-model="form.due" class="form__control" placeholder="Enter due amount"/>
            </div>
            <div class="form__group">
              <label class="form__label">Payable Amount</label>
              <input type="number" v-model="form.payable" class="form__control" placeholder="Enter payable amount"/>
            </div>
            <div class="form__group col-span-2">
              <label class="form__label">Note</label>
              <input type="text" v-model="form.note" class="form__control" placeholder="Enter note"/>
            </div>
            <BaseButton class="w-full bg-primary text-white col-span-2" :loading="customerStore.loading">submit</BaseButton>
          </form>
        </div>
      </div>
    </section>
  </Default>
</template>
