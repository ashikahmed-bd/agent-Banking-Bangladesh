import {defineStore} from 'pinia'
import axiosInstance from "@/plugins/axios.js";
import {useToastStore} from "@/stores/toast.js";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    token: null,
    user: {},
    errors: {},
  }),

  // persist: true,

  persist: {
    paths: ['token', 'user', 'role'],
  },

  getters: {
    loggedIn: state => !!state.token,
  },

  actions: {
    async login(formData) {
      this.loading = true;
      const toastStore = useToastStore();
      try {
        const response = await axiosInstance.post("/api/auth/login", formData);
        if (response.status === 200){
          this.token = response.data?.data?.token;
          this.user = response.data?.data?.user;
          this.role = response.data?.data?.role;
          console.log(response.data?.data);
          toastStore.success(response.data.message);
          setTimeout(() => {
            window.location.replace(import.meta.env.BASE_URL);
          }, 1000);

          return new Promise((resolve) =>{
            resolve(response.data)
          });
        }
      } catch (error) {
        if (error.response){
          this.errors = error.response.data.errors;
          toastStore.error(error.response.data.message);
        }
      }finally {
        this.loading = false
      }
    },

    async me(){
      const toastStore = useToastStore();
      try {
        const response = await axiosInstance.get('/api/me');
        this.user = response.data.data;
        if (response.status === 200) {
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

    async logout(){
      this.loading = true;
      try {
        const response = await axiosInstance.post('/api/auth/logout');
        if (response.status === 200) {
          const toastStore = useToastStore();
          toastStore.success(response.data.message);
          this.$reset();
          return new Promise((resolve) => {
            resolve(response);
          });
        }
      }catch (error){
        const toastStore = useToastStore();
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