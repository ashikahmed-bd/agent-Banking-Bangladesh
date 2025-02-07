import { defineStore } from 'pinia'
import axiosInstance from "@/plugins/axios.js";
import {useToastStore} from "@/stores/toast.js";

const toastStore = useToastStore();

export const useAccountStore = defineStore('account', {

  state: () => ({
    loading: false,
    deposit: false,
    withdraw: false,
    modal: false,
    accounts: {},
    balance: {},
    errors: {},
    transactions: {},
  }),

  getters: {

  },

  actions: {

    async all (){
      try {
        const response = await axiosInstance.get('/api/accounts');
        if (response.status === 200) {
          this.accounts = response.data;
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
      }
    },

    async store (form){
      this.loading = true;
      try {
        const response = await axiosInstance.post('/api/account/store', form);
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

    async getBalance (){
      try {
        const response = await axiosInstance.get('/api/balance');
        if (response.status === 200) {
          this.balance = response.data;
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


    async getHistory (id, date){
      try {
        const response = await axiosInstance.get(`/api/account/${id}/history`, {
          params: {
            date: date,
          }
        });
        if (response.status === 200) {
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
      }
    },

    async depositStore (formData){
      this.loading = true;

      try {
        const response = await axiosInstance.post(`/api/account/${formData.account_id}/deposit`, {
          amount: formData.amount,
          profit: formData.profit,
        });
        if (response.status === 200) {
          toastStore.success(response.data.message);
          await this.getBalance();
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

    async withdrawStore (formData){
      this.loading = true;

      try {
        const response = await axiosInstance.post(`/api/account/${formData.account_id}/withdraw`, {
          amount: formData.amount,
          profit: formData.profit,
        });
        if (response.status === 200) {
          await this.getBalance();
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

    async getTransactions (){
      this.loading = true;
      try {
        const response = await axiosInstance.get('/api/transactions');
        if (response.status === 200) {
          await this.getBalance();
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


    async getTransactionsPrint (){
      this.loading = true;
      try {
        const { data } = await axiosInstance.get('/api/pdf/transactions', {
          responseType: "blob",
        });
        const date = new Date().toISOString().slice(0, 10);
        const fileName = `report_${date}.pdf`;

        const url = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);

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