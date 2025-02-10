import { defineStore } from 'pinia'
import axiosInstance from "@/plugins/axios.js";
import {useToastStore} from "@/stores/toast.js";

const toastStore = useToastStore();

export const useUsersStore = defineStore('users', {

  state: () => ({
    loading: false,
    errors: {},
  }),

  getters: {

  },

  actions: {


    async store (form){
      this.loading = true;
      try {
        const response = await axiosInstance.post(`/api/users/store`, form);
        if (response.status === 201){
          toastStore.success(response.data.message);
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