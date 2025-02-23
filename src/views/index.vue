<script setup>
import Default from "@/layouts/Default.vue";
import {onMounted, reactive} from "vue";
import {storeToRefs} from "pinia";
import currency from "../utils/currency.js";
import IconDown from "@/components/icons/IconDown.vue";
import {useCustomerStore} from "@/stores/customer.js";
import IconUp from "@/components/icons/IconUp.vue";
import IconUserPlus from "@/components/icons/IconUserPlus.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseModal from "@/components/BaseModal.vue";
import IconPrint from "@/components/icons/IconPrint.vue";

const customerStore = useCustomerStore();
const {customers} = storeToRefs(customerStore);

const getCustomers = async () => {
  await customerStore.all();
}

const customersReport = () => {
  customerStore.getReportPrint();
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
}

onMounted(() => {
  getCustomers();
})
</script>

<template>
  <Default>
    <main class="px-4">
      <section class="bg-white rounded-2xl text-dark p-4 my-4">
        <div class="flex items-center justify-center gap-4">
          <article class="w-full flex items-center">
            <div class="flex-none h-10 w-auto">
              <IconDown class="bg-success rounded-full text-white p-2 size-10"/>
            </div>
            <div class="block font-semibold text-base ml-2">
              <span class="block font-semibold">Due</span>
              <h2 v-if="true" class="block">{{currency(5622)}}</h2>
              <h2 v-else class="block">Loading...</h2>
            </div>
          </article>

          <article class="w-full flex items-center">
            <div class="flex-none h-10 w-auto">
              <IconUp class="bg-danger rounded-full text-white p-2 size-10"/>
            </div>
            <div class="block font-semibold text-base ml-2">
              <span class="block font-semibold">Payable</span>
              <h2 v-if="true" class="block">{{currency(5622)}}</h2>
              <h2 v-else class="block">Loading...</h2>
            </div>
          </article>
        </div>
      </section>

      <section class="bg-white rounded-2xl">
        <div class=" flex flex-col flex-grow">
          <div class="flex items-center justify-between p-4 border-b border-gray-300 border-dashed">
            <h3 class="flex items-center gap-2 font-semibold text-base">Customers (50)</h3>
            <div class="flex items-center gap-2">
              <button type="button" @click="customerStore.modal = !customerStore.modal" class="bg-red-50 p-2 rounded-full cursor-pointer">
                <IconUserPlus class="size-5"/>
              </button>
              <button type="button" @click="customersReport()" class="bg-red-50 p-2 rounded-full cursor-pointer">
                <IconPrint class="size-5"/>
              </button>
            </div>
          </div>

          <div class="w-full px-4 divide-y divide-dashed divide-gray-200 max-h-[calc(100vh-21rem)] scrollbar overflow-y-auto">
            <template v-if="true">
              <RouterLink :to="{name: 'customer.show', params: {id: 1}}" v-for="item in 20" class="py-2 flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <img src="/users.png" alt="img" class="ring-2 ring-red-50 rounded-full h-8 w-auto">
                  <div class="mr-2">
                    <h3 class="font-semibold">Abu Toha</h3>
                    <small class="text-xs">01211</small>
                  </div>
                </div>
                <div class="flex-none flex items-center gap-2">
                  <div class="flex  items-center gap-2">
                    <div class="flex-none text-right">
                      <h4 class="text-green-500">{{currency(500)}}</h4>
                      <small class="text-xs">12 Jan 2025</small>
                    </div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-primary">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </RouterLink>
            </template>

            <template v-else>
              <div v-for="item in 5" class='flex max-w-full animate-pulse py-3'>
                <div class='flex-shrink-0'>
                  <span class='flex justify-center items-center bg-gray-300 w-12 h-12 rounded-full'></span>
                </div>
                <div class='ml-4 w-full max-w-full'>
                  <h3 class='h-3 bg-gray-300 rounded-full mb-2'></h3>
                  <p class='h-2 bg-gray-300 rounded-full mb-1'></p>
                  <p class='h-2 bg-gray-300 rounded-full mb-1'></p>
                </div>
              </div>
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
              <input type="tel" v-model="form.phone" class="form__control" placeholder="Enter phone"/>
            </div>
            <div class="form__group">
              <label class="form__label">Enter Due</label>
              <input type="number" v-model="form.due" class="form__control" placeholder="Enter due"/>
            </div>

            <div class="form__group">
              <label class="form__label">Enter Payable</label>
              <input type="number" v-model="form.payable" class="form__control" placeholder="Enter payable"/>
            </div>
            <BaseButton class="w-full bg-primary text-white" :loading="customerStore.loading">submit</BaseButton>
          </form>
        </div>
      </BaseModal>
    </main>
  </Default>
</template>

<style scoped>

</style>