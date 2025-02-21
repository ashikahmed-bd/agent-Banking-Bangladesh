<script setup>
import Default from "@/layouts/Default.vue";
import {useAccountStore} from "@/stores/wallet.js";
import {storeToRefs} from "pinia";
import {onMounted, reactive, ref} from "vue";
import Swal from "sweetalert2";
import IconPrint from "@/components/icons/IconPrint.vue";

const accountStore = useAccountStore();
const {accounts, transactions} = storeToRefs(accountStore);

const selectedDate = ref(new Date().toISOString().split('T')[0]);

const form = reactive({
  date: selectedDate,
});

const getTransactions = async () => {
  await accountStore.getLatestTransactions();
}


onMounted(() => {
  getTransactions();
})
const getTransactionsPrint = async () => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to proceed with downloading the file?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, download it!',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#4513bb',
  });

  if (result.isConfirmed) {
    await accountStore.getTransactionsPrint();
  }
}
</script>

<template>
  <Default>

    <section class="py-4 flex flex-col flex-grow">
      <div class="bg-white rounded-xl">
        <div class="flex items-center justify-between p-4 border-b border-gray-300 border-dashed">
          <h3 class="flex items-center gap-2 font-semibold text-base">Transactions</h3>

          <div class="flex items-center gap-2">
            <input type="date" v-model="selectedDate" class="px-2 py-1 border border-gray-200 focus:border-primary focus:outline-none focus:ring-0 rounded placeholder:text-sm disabled:bg-gray-100 appearance-none">
            <button type="button" @click="getTransactionsPrint()" class="cursor-pointer">
              <IconPrint class="size-5"/>
            </button>
          </div>

        </div>

        <div class="w-full px-4 divide-y divide-dashed divide-gray-200 max-h-2xl overflow-y-auto">
          <template v-if="transactions.data">
            <article v-for="item in transactions.data" class="py-2 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <img :src="item.account?.logo_url" alt="img" class="bg-primary/10 p-1 rounded h-10 w-auto">
                <div class="mr-2">
                  <strong>{{item.account?.name}}</strong>
                  <p class="text-xs">{{item.account?.number}}</p>
                </div>
              </div>
              <div class="flex-none">
                <span v-if="item.type === 'credit'" class="text-green-500">{{currency(item.amount)}}</span>
                <span v-if="item.type === 'debit'" class="text-red-500">{{currency(item.amount)}}</span>
              </div>
            </article>
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

  </Default>

</template>

<style scoped>

</style>