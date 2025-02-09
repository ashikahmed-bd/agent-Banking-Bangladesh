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
        const response = await axiosInstance.get('/api/customers/all', {
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
        const response = await axiosInstance.post('/api/customers/store',formData);
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
        const response = await axiosInstance.get(`/api/customers/${id}/show`);
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
        const response = await axiosInstance.post(`/api/customers/${form.customer_id}/payment`, {
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
        const response = await axiosInstance.get(`/api/customers/${id}/report`);
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


    async getWallet (){
      try {
        const response = await axiosInstance.get(`/api/customers/wallet`);
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


    async getReportPrint (){
      this.loading = true;
      try {
        const { data } = await axiosInstance.get('/api/pdf/customers', {
          responseType: "blob",
        });
        const date = new Date().toISOString().slice(0, 10);
        const fileName = `customers-report_${date}.pdf`;

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