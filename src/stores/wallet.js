import { defineStore } from 'pinia'
import axiosInstance from "@/plugins/axios.js";
import {useToastStore} from "@/stores/toast.js";

const toastStore = useToastStore();

export const useWalletStore = defineStore('wallet', {

  state: () => ({
    loading: false,
    deposit: false,
    withdraw: false,
    balance: 0,
    errors: {},
  }),

  getters: {

  },

  actions: {

    async getDeposit (formData){
      this.loading = true;
      try {
        const response = await axiosInstance.post(`/api/cash/deposit`, {
          amount: formData.amount,
        });
        if (response.status === 200) {
          toastStore.success(response.data.message);
          this.deposit = false;
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



    async getWithdraw (formData){
      this.loading = true;
      try {
        const response = await axiosInstance.post('/api/cash/withdraw', {
          amount: formData.amount,
        });
        if (response.status === 200) {
          toastStore.success(response.data.message);
          this.withdraw = false;
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