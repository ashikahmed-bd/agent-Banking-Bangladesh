<script setup>
import Default from "@/layouts/Default.vue";
import {onMounted, reactive, ref} from "vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import BaseButton from "@/components/BaseButton.vue";
import {useCustomerStore} from "@/stores/customer.js";
import BaseModal from "@/components/BaseModal.vue";
import {storeToRefs} from "pinia";
import {useAccountStore} from "@/stores/account.js";
import currency from "../../utils/currency.js";

const customerStore = useCustomerStore();
const accountStore = useAccountStore();
const { customers } = storeToRefs(customerStore);
const { balance } = storeToRefs(accountStore);

const limit = ref(10);

const getCustomers = async () => {
  await customerStore.all(limit.value);
}

const form = reactive({
  name: '',
  phone: '',
  due: '',
  payable: '',
});

const onSubmit = async () => {
  await customerStore.store(form);

  form.name = '';
  form.phone = '';
  form.due = '';
  form.payable = '';
  await getCustomers();
}

const getBalance = async () => {
  await accountStore.getBalance();
}

onMounted(() => {
  getCustomers();
  getBalance();
})
</script>

<template>
  <Default>
    <section class="py-2">
      <div class="bg-white rounded-xl px-4 py-2">
        <div class="flex items-center justify-between mb-4">
          <div class="w-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-red-500 text-white rounded-full size-10 p-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            <div class="block font-semibold text-base ml-4">
              <span class="block font-semibold text-base">Total Due</span>
              <h2 v-if="balance.wallet" class="block text-red-500">{{currency(balance.wallet?.due)}}</h2>
              <h2 v-else class="block font-semibold">loading...</h2>
            </div>
          </div>

          <div class="w-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-green-500 text-white rounded-full size-10 p-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
            </svg>
            <div class="block font-semibold text-base ml-4">
              <span class="block font-semibold text-base">Total Payable</span>
              <h2 v-if="balance.wallet" class="block text-green-500">{{currency(balance.wallet?.payable)}}</h2>
              <h2 v-else class="block font-semibold">loading...</h2>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-2">
      <div class="bg-white rounded-xl px-4 py-2">
        <div class="flex items-center justify-between border-b border-dashed border-gray-300 py-4">
          <h3 class="font-semibold text-lg">Customer List</h3>
          <button type="button" @click="customerStore.modal = !customerStore.modal" class="bg-primary text-white p-2 rounded-full cursor-pointer">
            <IconPlus class="size-5"/>
          </button>
        </div>

        <div class="w-full h-1/2 overflow-auto scrollbar divide-y divide-dashed divide-gray-200">
          <template v-if="customers.data">
            <RouterLink :to="{name: 'customer.show', params: {id: customer.id}}" v-for="customer in customers.data" :key="customer.id" class="py-2  flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img src="/user.png" alt="img" class="h-8 w-auto">
                <div class="mr-2">
                  <strong>{{customer.name}}</strong>
                  <p class="text-xs">{{customer.phone ?? 'N/A'}}</p>
                </div>
              </div>
              <div class="flex-none flex items-center gap-4">
                <div class="flex items-center gap-2">
                  <p v-if="customer.balance > 0" class="text-green-500">{{customer.balance}}</p>
                  <p v-else-if="customer.balance === 0" class="text-gray-500">{{customer.balance}}</p>
                  <p v-else class="text-red-500">{{customer.balance}}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-primary">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </RouterLink>
          </template>

          <template v-else>
            <p>Loading...</p>
          </template>
        </div>
      </div>
    </section>

    <BaseModal :show="customerStore.modal">
      <div class="flex justify-between items-center border-b border-gray-300 border-dashed pb-3">
        <h2 class="text-xl font-semibold">Add Customer</h2>
        <button type="button" class="cursor-pointer text-red-500" @click="customerStore.modal = false">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="mt-4">
        <form @submit.prevent="onSubmit" class="w-full max-w-sm">
          <div class="form__group">
            <label class="form__label">Enter Name</label>
            <input type="text" v-model="form.name" class="form__control" placeholder="Enter name"/>
          </div>
          <div class="form__group">
            <label class="form__label">Phone Number</label>
            <input type="number" v-model="form.phone" class="form__control" placeholder="Enter phone"/>
          </div>
          <div class="form__group">
            <label class="form__label">Enter Due</label>
            <input type="number" v-model="form.due" class="form__control" placeholder="Enter due"/>
          </div>

          <div class="form__group">
            <label class="form__label">Enter Payable</label>
            <input type="number" v-model="form.payable" class="form__control" placeholder="Enter payable"/>
          </div>
          <BaseButton class="w-full" :loading="customerStore.loading">submit</BaseButton>
        </form>
      </div>
    </BaseModal>

  </Default>
</template>
