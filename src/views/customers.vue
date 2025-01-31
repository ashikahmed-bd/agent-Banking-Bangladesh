<script setup>

import Default from "@/layouts/Default.vue";
import {reactive, ref} from "vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import currency from "@/utils/currency.js";
import BaseButton from "@/components/BaseButton.vue";
import {useCustomerStore} from "@/stores/customer.js";

const customerStore = useCustomerStore();

const form = reactive({
  name: '',
  phone: '',
  amount: '',
});

const onSubmit = async () => {
  await customerStore.store(form)

  form.name = '';
  form.phone = '';
  form.amount = '';
}


</script>

<template>
  <Default>
    <section class="bg-gray-100 p-4">
      <div class="bg-white rounded-xl shadow p-4">
        <div class="flex items-center justify-between mb-4">
          <div class="w-full flex items-center">
            <img src="/cash.png" alt="cash" class="h-10 w-auto">
            <div class="block font-semibold text-base ml-2">
              <span class="block font-semibold text-base">Total Due</span>
              <h2 class="block font-semibold text-xl">00</h2>
            </div>
          </div>

          <div class="w-full flex items-center">
            <img src="/wallet.png" alt="cash" class="h-10 w-auto">
            <div class="block font-semibold text-base ml-2">
              <span class="block font-semibold text-base">Repayment</span>
              <h2 class="block font-semibold text-xl">00</h2>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="px-4 py-4">
      <div class="bg-white rounded-md p-4">
        <div class="flex items-center justify-between border-b border-dashed border-gray-300 py-4">
          <h3 class="font-semibold text-lg">Customer List (10)</h3>
          <button type="button" @click="customerStore.modal = !customerStore.modal" class="bg-primary text-white p-2 rounded-full cursor-pointer">
            <IconPlus class="size-5"/>
          </button>
        </div>

        <div class="w-full divide-y divide-dashed divide-gray-200">
          <a href="#" v-for="item in 10" class="py-2  flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img src="/user.png" alt="img" class="h-8 w-auto">
              <div class="mr-2">
                <strong>Ashik Ahmed</strong>
                <p class="text-xs">01911742233</p>
              </div>
            </div>
            <div class="flex-none">
              <p class="text-green-500">1500</p>
              <p class="text-red-500">500</p>
            </div>
          </a>
        </div>
      </div>
    </section>


    <dialog v-if="customerStore.modal" class="w-full shadow-2xl bg-white rounded-xl fixed top-50 flex items-center justify-center max-w-sm mx-auto z-50">
      <div class="w-full px-4 py-8">
        <div class="flex items-center justify-between border-b border-gray-300 border-dashed mb-3">
          <h2 class="text-lg font-bold mb-4">Add Customer</h2>
          <button type="button" class="cursor-pointer text-red-500" @click="customerStore.modal = false">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form @submit.prevent="onSubmit" class="w-full max-w-sm">
          <div class="form__group">
            <label class="form__label">Enter Name</label>
            <input type="text" v-model="form.name" class="form__control" placeholder="Enter name"/>
          </div>
          <div class="form__group">
            <label class="form__label">Enter Phone</label>
            <input type="text" v-model="form.phone" class="form__control" placeholder="Enter phone"/>
          </div>
          <div class="form__group">
            <label class="form__label">Enter Amount</label>
            <input type="number" v-model="form.amount" class="form__control" placeholder="Enter amount"/>
          </div>
          <BaseButton class="w-full" :loading="customerStore.loading">submit</BaseButton>
        </form>
      </div>
    </dialog>

  </Default>
</template>
