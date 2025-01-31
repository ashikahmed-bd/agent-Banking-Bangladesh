<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },

});
</script>

<template>
  <div v-if="props.show" class="fixed inset-0 bg-black/50 px-4 flex items-center justify-center z-40">
    <div class="bg-white rounded-lg shadow-lg p-6 w-96">
      <slot/>
    </div>
  </div>
</template>

<style scoped>

</style>