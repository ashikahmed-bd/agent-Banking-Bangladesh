import { defineStore } from 'pinia'
import axiosInstance from "@/plugins/axios.js";
import {useToastStore} from "@/stores/toast.js";

const toastStore = useToastStore();

export const useCustomerStore = defineStore('customer', {

  state: () => ({
    loading: false,
    modal: false,
    customers: {},
    customer: {},
    errors: {},
  }),

  getters: {

  },

  actions: {

    async all (limit){
      try {
        const response = await axiosInstance.get('/api/customers', {
          params: {
            limit: limit,
          }
        });
        if (response.status === 200) {
          this.customers = response.data;
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


    async store (formData){
      this.loading = true;
      try {
        const response = await axiosInstance.post('/api/customer/store',formData);
        if (response.status === 201) {
          toastStore.success(response.data.message);
          this.modal = false;
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


    async show (id){
      this.loading = true;
      try {
        const response = await axiosInstance.get(`/api/customer/${id}/show`);
        if (response.status === 200) {
          this.customer = response.data.data;
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


    async payment (form){
      this.loading = true;
      try {
        const response = await axiosInstance.post(`/api/customer/${form.customer_id}/payment`, {
          due: form.due,
          payable: form.payable,
          note: form.note,
        });
        if (response.status === 201) {
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


    async getReport (id){
      try {
        const response = await axiosInstance.get(`/api/customer/${id}/report`);
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
      }
    },






  },
})