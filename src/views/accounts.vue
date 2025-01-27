<script setup>
import Default from "@/layouts/Default.vue";
import WalletComponent from "@/components/WalletComponent.vue";

</script>

<template>
  <Default>
    <section class="bg-gray-100 p-2">
      <div class="bg-white rounded-md p-4">
        <WalletComponent/>
      </div>
    </section>

    <section class="bg-gray-100 p-2">
      <div class="bg-white rounded-md p-4">
        <h3 class="font-semibold text-base">Account List</h3>
        <div class="w-full divide-y divide-dashed divide-gray-200">
          <a href="#" v-for="item in 5" class="py-2  flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img src="/account/city.png" alt="img" class="h-8 w-auto">
              <div class="mr-2">
                <strong>City Bank</strong>
                <p class="text-xs">Shopping</p>
              </div>
            </div>
            <div class="flex-none">
              <span class="text-indigo-500">1500</span>
            </div>
          </a>
        </div>
      </div>
    </section>

  </Default>
</template>
