<script setup>
import {useAuthStore} from "@/stores/auth.js";
import {storeToRefs} from "pinia";
import Swal from "sweetalert2";

const authStore = useAuthStore();
const {user} = storeToRefs(authStore);


</script>

<template>
  <header class="bg-primary sticky top-0 text-white py-4 px-4">
    <div class="container mx-auto flex items-center justify-between">
      <a href="/" >
        <img src="/logo.svg" alt="logo" class="h-12 w-auto">
      </a>
      <div class="flex items-center gap-2">
        <div class="text-right mr-2">
          <h3 class="-mb-1 capitalize">{{user.name}}</h3>
          <small class="text-xs">{{user.phone}}</small>
        </div>
        <RouterLink :to="{name: 'profile'}" class="header-user">
          <img :src="user.avatar_url" :alt="user.name" class="h-10 w-auto ring-2 rounded-full">
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>