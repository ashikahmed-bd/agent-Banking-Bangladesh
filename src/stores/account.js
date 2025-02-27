import { defineStore } from 'pinia'
import axiosInstance from "@/plugins/axios.js";
import {useToastStore} from "@/stores/toast.js";

const toastStore = useToastStore();

export const useAccountStore = defineStore('account', {

  state: () => ({
    loading: false,
    modal: false,
    errors: {},
    accounts: {},
    transactions: {},
    statement: {},
  }),

  getters: {

  },

  actions: {

    async all (){
      try {
        const response = await axiosInstance.get('api/accounts');
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


    async getTransactions (date){
      try {
        const response = await axiosInstance.get(`/api/transactions`, {
          params: {
            date: date,
          }
        });
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
      }
    },


    async getStatement (form){
      try {
        const response = await axiosInstance.get(`/api/account/${form.account_id}/statement`, {
          params: {
            date: form.date,
          }
        });
        if (response.status === 200) {
          this.statement = response.data;
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

  },
})