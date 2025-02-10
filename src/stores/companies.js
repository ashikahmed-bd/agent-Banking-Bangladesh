import { defineStore } from 'pinia'
import axiosInstance from "@/plugins/axios.js";
import {useToastStore} from "@/stores/toast.js";

const toastStore = useToastStore();

export const useCompaniesStore = defineStore('companies', {

  state: () => ({
    loading: false,
    errors: {},
    companies: {},
  }),

  getters: {

  },

  actions: {


    async store (form){
      this.loading = true;
      try {
        const response = await axiosInstance.post(`/api/companies/store`, form);
        if (response.status === 201){
          toastStore.success(response.data.message);
          setTimeout(() => {
            window.location.replace(import.meta.env.BASE_URL);
          }, 1000);

          return new Promise((resolve) =>{
            resolve(response.data)
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