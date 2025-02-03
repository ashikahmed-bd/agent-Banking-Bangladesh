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
  <main class="w-full max-w-md mx-auto mt-20 bg-white rounded-2xl p-8">
    <h2 class="text-2xl font-bold text-center text-gray-700">Welcome Back</h2>
    <p class="text-gray-500 text-center mb-6">Sign in to continue</p>

    <form @submit.prevent="onSubmit">
      <div class="form__group">
        <label class="form__label" for="phone">Email</label>
        <input type="tel" v-model="form.phone" id="phone" placeholder="Enter your phone" class="form__control">
      </div>

      <div class="form__group">
        <label class="form__label" for="password">Password</label>
        <input type="password" v-model="form.password" id="password" placeholder="Enter your password" class="form__control">
      </div>

      <div class="flex justify-between items-center mb-4">
        <label class="flex items-center">
          <input type="checkbox" class="text-blue-500 focus:ring-blue-400">
          <span class="ml-2 text-gray-600">Remember me</span>
        </label>
        <a href="#" class="text-primary text-sm hover:underline">Forgot password?</a>
      </div>

      <BaseButton :loading="authStore.loading" class="w-full">Submit</BaseButton>
    </form>

    <p class="text-center text-gray-600 mt-4">
      Don't have an account?
      <a href="#" class="text-blue-500 hover:underline">Sign up</a>
    </p>
  </main>

</template>

<style scoped>

</style>