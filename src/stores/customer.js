import { defineStore } from 'pinia'
import axiosInstance from "@/plugins/axios.js";
import {useToastStore} from "@/stores/toast.js";

const toastStore = useToastStore();

export const useCustomerStore = defineStore('customer', {

  state: () => ({
    loading: false,
    modal: false,
    customers: {},
    errors: {},
  }),

  getters: {

  },

  actions: {

    async all (){
      try {
        const response = await axiosInstance.get('/api/customers');
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
        if (response.status === 200) {
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