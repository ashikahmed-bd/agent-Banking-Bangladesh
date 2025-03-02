<script setup>
import Header from "@/components/Header.vue";
import {usePaymentStore} from "@/stores/payment.js";
import BaseModal from "@/components/BaseModal.vue";
import BaseButton from "@/components/BaseButton.vue";
import {onMounted, reactive, ref} from "vue";
import {storeToRefs} from "pinia";
import {useCompanyStore} from "@/stores/company.js";

const paymentStore = usePaymentStore();
const companyStore = useCompanyStore();

const {companies, selected} = storeToRefs(companyStore);

const selectedSender = ref('');
const selectedReceiver = ref('');

const form = reactive({
  sender_id: selectedSender,
  receiver_id: selectedReceiver,
  amount: '',
  fee: '',
  reference: '',
  remark: '',
});

const onSubmit = async () => {
  await paymentStore.getExchange(form);
}

const selectedCompany = ref('');

const getCompanies = async () => {
  await companyStore.all();
}

const getDefaultCompany = async () => {
  await companyStore.getDefault();
}

onMounted(() => {
  getCompanies();
  getDefaultCompany();
})

</script>

<template>

  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-white p-6">
      <h2 class="text-2xl font-bold text-green-500">Smart Cash</h2>
      <nav class="mt-8">
        <ul>
          <li class="flex items-center mb-4 bg-primary text-green-50 p-2 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <RouterLink :to="{name: 'home'}" class="ml-2">Dashboard</RouterLink>
          </li>
          <li class="flex items-center mb-4 p-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
            </svg>
            <RouterLink :to="{name: 'accounts'}" class="ml-2">Accounts</RouterLink>
          </li>
          <li class="flex items-center mb-4 p-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
            <RouterLink :to="{name: 'customers'}" class="ml-2">Customers</RouterLink>
          </li>
          <li class="flex items-center mb-4 p-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
            </svg>
            <RouterLink :to="{name: 'index.vue'}" class="ml-2">Transactions</RouterLink>
          </li>
          <li class="flex items-center mb-4 p-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
            </svg>
            <a href="#" class="ml-2">Companies</a>
          </li>
          <li class="flex items-center mb-4 p-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <a href="#" class="ml-2">Settings</a>
          </li>
          <li class="flex items-center mb-4 p-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9" />
            </svg>
            <a href="#" class="ml-2">Logout</a>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="bg-white flex-1">
      <header class="flex justify-between items-center px-6 py-4">
        <select class="p-2 border border-gray-100 focus:border-primary focus:outline-none focus:ring-0 rounded">
          <option :value="company.id" v-for="company in companies.data" :key="company.id">{{company.name}}</option>
        </select>

        <div class="flex items-center space-x-4">
          <div class="w-10 h-10 bg-white ring-2 rounded-full">

          </div>
        </div>
      </header>

      <!-- content area -->
      <div class="bg-green-100 p-6 h-screen overflow-y-auto">
        <!-- dynamic content -->
        <slot/>
      </div>
    </main>
  </div>

  <BaseModal :show="paymentStore.modal">
    <div class="flex justify-between items-center border-b border-gray-300 border-dashed pb-3">
      <h2 class="text-xl font-semibold">Add Exchange</h2>
      <button type="button" class="cursor-pointer text-red-500" @click="paymentStore.modal = false">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="mt-4">
      <form @submit.prevent="onSubmit" class="w-full max-w-sm">
        <div class="grid grid-cols-2 gap-4">
          <div class="form__group">
            <label class="form__label">Send <span class="text-danger">*</span></label>
            <select v-model="selectedSender" class="form__control">
              <option value="" disabled>Select Sender</option>
              <option :value="account.id" v-for="account in accounts.data" :key="account.id">{{account.name +' - '+account.number}}</option>
            </select>
          </div>
          <div class="form__group">
            <label class="form__label">Received <span class="text-danger">*</span></label>
            <select v-model="selectedReceiver" class="form__control">
              <option value="" disabled>Select Receiver</option>
              <option :value="account.id" v-for="account in accounts.data" :key="account.id">{{account.name +' - '+account.number}}</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="form__group">
            <label class="form__label">Amount <span class="text-danger">*</span></label>
            <input type="number" v-model="form.amount" class="form__control" placeholder="Enter amount"/>
          </div>

          <div class="form__group">
            <label class="form__label">Fee</label>
            <input type="number" v-model="form.fee" class="form__control" placeholder="Enter fee"/>
          </div>
        </div>

        <div class="form__group">
          <label class="form__label">Account No</label>
          <input type="text" v-model="form.reference" class="form__control" placeholder="Enter reference"/>
        </div>

        <div class="form__group">
          <label class="form__label">Reference (TrxID)</label>
          <input type="text" v-model="form.reference" class="form__control" placeholder="Enter reference"/>
        </div>

        <div class="form__group">
          <label class="form__label">Remark</label>
          <input type="text" v-model="form.remark" class="form__control" placeholder="Enter remark"/>
        </div>

        <BaseButton class="w-full bg-primary text-white" :loading="paymentStore.loading">submit</BaseButton>
      </form>
    </div>
  </BaseModal>

</template>

<style scoped>

</style>