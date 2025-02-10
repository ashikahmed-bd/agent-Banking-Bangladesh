<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';
import {useRoute, useRouter} from 'vue-router';

const route = useRoute();
const router = useRouter();
const token = ref(route.query.token);
const name = ref('');
const password = ref('');
const message = ref('');
const email = ref('');
const loading = ref(false);
const invitationValid = ref(false);

const validateInvitation = async () => {
  try {
    const response = await axios.get(`http://localhost/api/validate-invitation/${token.value}`);
    email.value = response.data.email;
    invitationValid.value = true;
  } catch (error) {
    message.value = "Invalid or expired invitation.";
  }
};

const acceptInvitation = async () => {
  loading.value = true;
  message.value = '';

  try {
    await axios.post('http://localhost/api/accept-invitation', {
      token: token.value,
      name: name.value,
      password: password.value
    });

    message.value = {type: 'success', text: 'Invitation accepted! Redirecting to login...'};
    setTimeout(() => router.push('/login'), 3000);
  } catch (error) {
    message.value = {type: 'error', text: "Error accepting invitation."};
  } finally {
    loading.value = false;
  }
};

const cancelInvitation = async () => {
  loading.value = true;
  message.value = '';

  try {
    await axios.delete(`http://localhost/api/cancel-invitation/${token.value}`);
    message.value = {type: 'success', text: 'Invitation canceled successfully!'};
  } catch (error) {
    message.value = {type: 'error', text: "Error canceling invitation."};
  } finally {
    loading.value = false;
  }
};

onMounted(validateInvitation);
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
      <h2 class="text-xl font-semibold text-gray-800 text-center">Respond to Invitation</h2>

      <div v-if="message"
           :class="message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
           class="p-2 mt-4 rounded">
        {{ message.text }}
      </div>

      <div v-if="invitationValid" class="mt-4">
        <p class="text-gray-700 text-center">You've been invited with email: <strong>{{ email }}</strong></p>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700">Full Name</label>
          <input v-model="name" type="text" class="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                 placeholder="Enter your name" required/>
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input v-model="password" type="password"
                 class="mt-1 w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                 placeholder="Choose a password" required/>
        </div>

        <div class="mt-6 flex space-x-2">
          <button @click="acceptInvitation" :disabled="loading"
                  class="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200">
            Accept Invitation
          </button>

          <button @click="cancelInvitation" :disabled="loading"
                  class="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200">
            Cancel Invitation
          </button>
        </div>
      </div>

      <div v-else class="text-red-500 text-center mt-4">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<style scoped>
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
