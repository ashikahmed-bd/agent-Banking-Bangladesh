import { defineStore } from 'pinia'
import axiosInstance from "@/plugins/axios.js";
import {useToastStore} from "@/stores/toast.js";

const toastStore = useToastStore();

export const useCashStore = defineStore('cash', {

  state: () => ({
    loading: false,
    errors: {},
  }),

  getters: {

  },

  actions: {

    async getBalance (){
      try {
        const response = await axiosInstance.get('/api/cash/balance');
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