<script setup>

import Default from "@/layouts/Default.vue";
import {ref} from "vue";
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const depositModal = ref(false);
const deposit = () => {
  depositModal.value = true;
}
const withdraw = () => {
  depositModal.value = true;
}
const carouselConfig = {
  itemsToShow: 2.5,
  wrapAround: true,
  gap: 10
}

const mobileBank = {
  itemsToShow: 3.5,
  wrapAround: true,
  gap: 10
}

</script>

<template>
  <Default>
    <section class="bg-gray-100 p-2">
      <div class="bg-white rounded-md p-4">
        <div class="block font-semibold text-base mb-2">
          <span class="block font-semibold text-base">Total Balance</span>
          <h2 class="block font-semibold text-2xl">$ 2,562.50</h2>
        </div>
        <div class="flex items-center justify-between">
          <button type="button" @click="deposit" class="bg-indigo-500 text-white px-6 py-1.5 rounded-md cursor-pointer">Deposit</button>
          <button type="button" @click="withdraw" class="bg-red-500 text-white px-6 py-1.5 rounded-md cursor-pointer">Deposit</button>
        </div>
      </div>
    </section>

    <section class="bg-gray-100 p-2">
      <Carousel v-bind="carouselConfig">
        <Slide v-for="slide in 10" :key="slide">
          <div class="carousel__item relative gap-4">
            <img alt="card" src="/account/2.png" class="object-cover">
            <div class="min-h-full flex flex-col absolute top-0 p-2.5">
              <div class="flex-1">
                <h3 class="font-semibold">City Bank</h3>
                <small class="font-semibold">Md. Maidul Islam</small>
              </div>
              <div class="flex-none">
                <span class="font-semibold ">2500.00</span>
              </div>
            </div>
          </div>
        </Slide>
      </Carousel>
    </section>

    <section class="bg-gray-100 p-2">
      <Carousel v-bind="mobileBank">
        <Slide v-for="slide in 10" :key="slide">
          <div class="carousel__item relative gap-4">
            <img alt="card" src="/account/2.png" class="object-cover">
            <div class="min-h-full flex flex-col absolute top-0 p-2.5">
              <div class="flex-1">
                <h3 class="font-semibold">Bkash</h3>
                <small class="font-semibold">2500.00</small>
              </div>
            </div>
          </div>
        </Slide>
      </Carousel>
    </section>

    <section class="bg-white p-2">
      <div class="flex items-center justify-between py-2">
        <h3 class="font-semibold text-base">Latest transactions</h3>
        <a href="#" class="text-right text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
        </a>
      </div>
      <div class="w-full">
        <a href="#" v-for="item in 5" class="bg-gray-100 p-2 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <img src="/account/city.png" alt="img" class="h-8 w-auto">
            <div class="mr-2">
              <strong>City Bank</strong>
              <p class="text-xs">Shopping</p>
            </div>
          </div>
          <div class="flex-none">
            <span class="text-red-500"> -150</span>
          </div>
        </a>
      </div>
    </section>


    <dialog v-if="depositModal" class="fixed w-full mx-auto bottom-0 left-0 right-0 bg-white rounded-t-xl z-50 flex items-center justify-center animate__animated animate__slideInUp">
      <div class="p-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold mb-4">Deposit</h2>
          <button type="button" class="cursor-pointer" @click="depositModal = false">X</button>
        </div>
        <form class="w-full max-w-sm">
          <div class="form__group">
            <label class="form__label">From</label>
            <select class="form__control">
              <option>Investment (*** 7284)</option>
              <option>Saving (*** 1234)</option>
              <option>Checking (*** 5678)</option>
            </select>
          </div>

          <div class="form__group">
            <label class="form__label">Enter Amount</label>
            <input type="number" class="form__control" placeholder="Enter amount" value="768"/>
          </div>

          <div class="flex justify-center">
            <button type="submit" class="w-full bg-indigo-500 text-white px-6 py-1.5 rounded-md cursor-pointer">Deposit</button>
          </div>
        </form>
      </div>
    </dialog>

  </Default>
</template>
