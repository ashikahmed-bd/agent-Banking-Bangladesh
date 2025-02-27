import { defineStore } from 'pinia'
import axiosInstance from "@/plugins/axios.js";
import {useToastStore} from "@/stores/toast.js";

const toastStore = useToastStore();

export const usePaymentStore = defineStore('payment', {

  state: () => ({
    loading: false,
    modal: false,
    deposit: false,
    withdraw: false,
    errors: {},
  }),

  getters: {

  },

  actions: {

    async depositStore (form){
      this.loading = true;
      try {
        const response = await axiosInstance.post(`/api/account/${form.account_id}/deposit`, form);
        if (response.status === 201) {
          this.deposit = false;
          toastStore.success(response.data.message);
          return new Promise((resolve) => {
            resolve(response.data);
          });
        }
      }catch (error) {
        if (error.response){
          this.errors = error.response.data.errors;
          toastStore.error(error.response.data.message);
        }
      }finally {
        this.loading = false;
      }
    },

    async withdrawStore (form){
      this.loading = true;
      try {
        const response = await axiosInstance.post(`/api/account/${form.account_id}/withdraw`, form);
        if (response.status === 201) {
          this.withdraw = false;
          toastStore.success(response.data.message);
          return new Promise((resolve) => {
            resolve(response.data);
          });
        }
      }catch (error) {
        if (error.response){
          this.errors = error.response.data.errors;
          toastStore.error(error.response.data.message);
        }
      }finally {
        this.loading = false;
      }
    },

    async getExchange (form){
      this.loading = true;
      try {
        const response = await axiosInstance.post('/api/account/exchange', form);
        if (response.status === 201) {
          this.modal = false;
          toastStore.success(response.data.message);
          return new Promise((resolve) => {
            resolve(response.data);
          });
        }
      }catch (error) {
        if (error.response){
          this.errors = error.response.data.errors;
          toastStore.error(error.response.data.message);
        }
      }finally {
        this.loading = false;
      }
    },

  },
})