<script setup>
import Default from "@/layouts/Default.vue";
import BaseButton from "@/components/BaseButton.vue";
import {useUsersStore} from "@/stores/users.js";
import {reactive} from "vue";

const userStore = useUsersStore();

const form = reactive({
  name: '',
  phone: '',
  email: '',
  password: '',
});


const onSubmit = async () => {
  await userStore.store(form);
}

</script>

<template>
  <Default>

    <section class="bg-gray-100 p-2">
      <div class="bg-white rounded-md p-4">
        <h3 class="font-semibold text-lg border-b border-dashed border-gray-300">Profile info</h3>

        <div class="py-6">
          <form @submit.prevent="onSubmit" class="grid grid-cols-1">
            <div class="form__group">
              <label for="name" class="form__label">Name</label>
              <input type="text" v-model="form.name" class="form__control" placeholder="Enter name">
            </div>
            <div class="form__group">
              <label for="phone" class="form__label">Phone</label>
              <input type="tel" v-model="form.phone" class="form__control" placeholder="Enter phone">
            </div>
            <div class="form__group">
              <label for="email" class="form__label">Email</label>
              <input type="email" v-model="form.email" class="form__control" placeholder="Enter email">
            </div>
            <div class="form__group">
              <label for="password" class="form__label">Password</label>
              <input type="password" v-model="form.password"  class="form__control" placeholder="Enter password">
            </div>
            <div class="form__group">
              <BaseButton :loading="userStore.loading" class="w-full bg-primary text-white">Submit</BaseButton>
            </div>
          </form>
        </div>
      </div>
    </section>

  </Default>
</template>
