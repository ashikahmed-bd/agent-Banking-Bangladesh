<script setup>
import {reactive} from "vue";
import BaseButton from "@/components/BaseButton.vue";
import {useAuthStore} from "@/stores/auth.js";

const authStore = useAuthStore();

const form = reactive({
  phone: '01911742233',
  password: 'password',
});


const onSubmit = async () => {
  await authStore.login(form);
}


</script>

<template>
  <main class="bg-primary">
    <div class="h-screen flex flex-col items-center justify-center">
      <h2 class="text-2xl font-bold text-center text-white">Welcome Back</h2>
      <p class="text-white text-center mb-6">Sign in to continue</p>

      <form @submit.prevent="onSubmit" class="w-full max-w-full px-6">
        <div class="mb-3">
          <label class="block text-white" for="phone">Phone Number</label>
          <input type="tel" v-model="form.phone" id="phone" placeholder="Enter your phone" class="w-full bg-light px-2 py-2 border border-light focus:border-light focus:outline-none focus:ring-0 rounded disabled:bg-gray-100">
        </div>

        <div class="mb-3">
          <label class="block text-white" for="password">Password</label>
          <input type="password" v-model="form.password" id="password" placeholder="Enter your password" class="w-full bg-light px-2 py-2 border border-light focus:border-light focus:outline-none focus:ring-0 rounded disabled:bg-gray-100">
        </div>

        <div class="flex justify-between items-center mb-4">
          <label class="flex items-center">
            <input type="checkbox" class="text-white focus:ring-white">
            <span class="ml-2 text-white">Remember me</span>
          </label>
          <a href="#" class="text-white hover:underline">Forgot password?</a>
        </div>
        <BaseButton :loading="authStore.loading" class="w-full bg-light text-primary">Submit</BaseButton>
      </form>
    </div>
  </main>

</template>

<style scoped>

</style>