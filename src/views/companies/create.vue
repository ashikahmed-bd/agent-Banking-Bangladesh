<script setup>
import {reactive} from 'vue';
import { useRoute } from 'vue-router';
import BaseButton from "@/components/BaseButton.vue";
import {useCompaniesStore} from "@/stores/companies.js";

const companiesStore = useCompaniesStore();

const route = useRoute();

const form = reactive({
  name: '',
  phone: '',
  address: '',
});


const onSubmit = async () => {
  await companiesStore.store(form);
}

</script>

<template>
  <main class="bg-body text-base">
    <div class="h-screen flex flex-col items-center justify-center">
      <h2 class="text-2xl font-bold text-center text-primary">Welcome Back</h2>
      <p class="text-primary text-center mb-6">Create an Companies</p>
      <form @submit.prevent="onSubmit" class="w-full max-w-full px-6">
        <div class="mb-3">
          <label class="block mb-2" for="name">Company Name</label>
          <input type="text" v-model="form.name" id="phone" placeholder="Enter your name" class="w-full bg-white rounded-full px-4 py-2 border border-light focus:border-light focus:outline-none focus:ring-0 rounded disabled:bg-gray-100">
        </div>
        <div class="mb-3">
          <label class="block mb-2" for="phone">Phone Number</label>
          <input type="tel" v-model="form.phone" id="phone" placeholder="Enter your phone" class="w-full bg-white rounded-full px-4 py-2 border border-light focus:border-light focus:outline-none focus:ring-0 rounded disabled:bg-gray-100">
        </div>

        <div class="mb-3">
          <label class="block mb-2" for="address">Address</label>
          <input type="text" v-model="form.address" id="address" placeholder="Enter your address" class="w-full bg-white rounded-full px-4 py-2 border border-light focus:border-light focus:outline-none focus:ring-0 rounded disabled:bg-gray-100">
        </div>

        <BaseButton :loading="companiesStore.loading" class="w-full bg-primary rounded-full text-white">Register</BaseButton>
      </form>
    </div>
  </main>

</template>

<style scoped>

</style>