import { defineStore } from 'pinia'
import axiosInstance from "@/plugins/axios.js";
import {useToastStore} from "@/stores/toast.js";

const toastStore = useToastStore();

export const useDashboardStore = defineStore('dashboard', {

  state: () => ({
    loading: false,
    balances: {},
    errors: {},
    transactions: {},
  }),

  getters: {

  },

  actions: {


    async getAllBalances (){
      try {
        const response = await axiosInstance.get('/api/balances');
        if (response.status === 200) {
          this.balances = response.data;
          return new Promise((resolve) => {
            resolve(response.data);
          });
        }
      }catch (error) {
        if (error.response){
          this.errors = error.response.data.errors;
          toastStore.error(error.response.data.message);
        }
      }
    },


    async getTransactions (){
      this.loading = true;
      try {
        const response = await axiosInstance.get(`/api/transactions`);
        if (response.status === 200) {
          this.transactions = response.data;
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