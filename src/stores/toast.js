import {defineStore} from "pinia";
import {useToast} from "vue-toastification";
const toast = useToast();
export const useToastStore = defineStore('toast', {

    state: () => ({

    }),

    actions: {
        info(message) {
            toast.info(message, {
                timeout: 3000,
            });
            // setTimeout(() => {
            //     window.location.reload();
            // }, 1500);
        },

        success(message) {
            toast.success(message, {
                timeout: 3000,
            });
            // setTimeout(() => {
            //     window.location.reload();
            // }, 1500);
        },

        error(message) {
            toast.error(message, {
                timeout: 3000,
            });
            // setTimeout(() => {
            //     window.location.reload();
            // }, 1500);
        },

        warning(message) {
            toast.warning(message, {
                timeout: 3000,
            });
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        },
    },

})