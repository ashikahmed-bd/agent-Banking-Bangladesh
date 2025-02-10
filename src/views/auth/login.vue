<script setup>
import {reactive} from "vue";
import BaseButton from "@/components/BaseButton.vue";
import {useAuthStore} from "@/stores/auth.js";
import {useToastStore} from "@/stores/toast.js";
import {useRouter} from "vue-router";


const toastStore = useToastStore();
const authStore = useAuthStore();
const router = useRouter();

const form = reactive({
  phone: '01511742233',
  password: 'password',
});


const onSubmit = async () => {
  const response = await authStore.login(form);
  if (response.status === 200){
    toastStore.success(response.data.message);
    await router.push({name: 'home'})
  }
}


</script>

<template>
  <main class="bg-body text-base">
    <div class="h-screen flex flex-col items-center justify-center">
      <h2 class="text-2xl font-bold text-center text-primary">Welcome Back</h2>
      <p class="text-primary text-center mb-6">Sign in to continue</p>

      <form @submit.prevent="onSubmit" class="w-full max-w-full px-6">
        <div class="mb-3">
          <label class="block mb-2" for="phone">Phone Number</label>
          <input type="tel" v-model="form.phone" id="phone" placeholder="Enter your phone" class="w-full bg-white rounded-full px-4 py-2 border border-light focus:border-light focus:outline-none focus:ring-0 rounded disabled:bg-gray-100">
        </div>

        <div class="mb-3">
          <label class="block mb-2" for="password">Password</label>
          <input type="password" v-model="form.password" id="password" placeholder="Enter your password" class="w-full bg-white rounded-full px-4 py-2 border border-light focus:border-light focus:outline-none focus:ring-0 rounded disabled:bg-gray-100">
        </div>

        <div class="flex justify-between items-center mb-4">
          <label class="flex items-center">
            <input type="checkbox" class="text-white focus:ring-white">
            <span class="ml-2 text-primary">Remember me</span>
          </label>
          <a href="#" class="text-primary hover:underline">Forgot password?</a>
        </div>
        <BaseButton :loading="authStore.loading" class="w-full bg-primary rounded-full border border-gray-200 text-white">Submit</BaseButton>
      </form>
      <p class="py-6">
        Don’t have an account yet? <RouterLink :to="{name: 'register'}" class="font-medium text-primary hover:underline">Sign up</RouterLink>
      </p>
    </div>
  </main>

</template>

<style scoped>

</style>