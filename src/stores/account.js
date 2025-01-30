import { defineStore } from 'pinia'
import axiosInstance from "@/plugins/axios.js";
import {useToastStore} from "@/stores/toast.js";

const toastStore = useToastStore();

export const useAccountStore = defineStore('account', {

  state: () => ({
    loading: false,
    deposit: false,
    withdraw: false,
    accounts: {},
    balance: 0,
    errors: {},
  }),

  getters: {

  },

  actions: {
    async all (){
      try {
        const response = await axiosInstance.get('/api/account/all');
        if (response.status === 200) {
          this.accounts = response.data;
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

    async getBalance (){
      try {
        const response = await axiosInstance.get('/api/account/balance');
        if (response.status === 200) {
          this.balance = response.data.balance;
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
        const response = await axiosInstance.get(`/api/transaction/latest`);
        if (response.status === 200) {
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

    async depositStore (formData){
      this.loading = true;

      try {
        const response = await axiosInstance.post(`/api/account/${formData.account_id}/deposit`, {
          amount: formData.amount,
        });
        if (response.status === 200) {
          toastStore.success(response.data.message);
          this.deposit = false;
          await this.getBalance();
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

    async withdrawStore (formData){
      this.loading = true;

      try {
        const response = await axiosInstance.post(`/api/account/${formData.account_id}/withdraw`, {
          amount: formData.amount,
        });
        if (response.status === 200) {
          toastStore.success(response.data.message);
          this.withdraw = false;
          await this.getBalance();
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