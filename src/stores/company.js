import { defineStore } from 'pinia'
import axiosInstance from "@/plugins/axios.js";
import {useToastStore} from "@/stores/toast.js";

const toastStore = useToastStore();

export const useCompanyStore = defineStore('company', {

  state: () => ({
    loading: false,
    errors: {},
    companies: {},
    companyId: {},
  }),

  persist: {
    paths: ['default'],
  },

  getters: {

  },

  actions: {

    async getDefault(){
      try {
        const response = await axiosInstance.get('/api/companies/default');
        if (response.status === 200) {
          this.companyId = response.data.data.id;
          return new Promise((resolve) => {
            resolve(response.data);
          });
        }
      }catch (error){
        if (error.response){
          this.errors = error.response.data.errors;
          toastStore.error(error.response.data.message);
        }
      }
    },

    async all (){
      try {
        const response = await axiosInstance.get('/api/companies');
        if (response.status === 200) {
          this.companies = response.data;
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
        const response = await axiosInstance.post('/api/companies/store',formData);
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
        const response = await axiosInstance.get(`/api/companies/${id}/show`);
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

  },
})