import { defineStore } from 'pinia'
import axiosInstance from "@/plugins/axios.js";
import {useToastStore} from "@/stores/toast.js";

const toastStore = useToastStore();

export const useInvitationStore = defineStore('invitation', {

  state: () => ({
    loading: false,
    errors: {},
  }),

  getters: {

  },

  actions: {


    async validateInvitation (token){
      try {
        const response = await axiosInstance.get(`/api/validate/${token}`);
        console.log(response)

      }catch (error) {
        if (error.response){
          this.errors = error.response.data.errors;
          toastStore.error(error.response.data.message);
        }
      }
    },

  },
})