<script setup>
const props = defineProps(['onConfirm', 'modalData']);

defineEmits(['close']);

const confirm = () => {
  if (props.onConfirm) props.onConfirm();
};
</script>

<template>
  <div class="modal-overlay" aria-hidden="true"></div>
  <div class="modal">
    <div class="relative bg-white rounded-lg shadow">
      <div class="p-6 text-center">
        <h3 class="mb-5 text-lg font-normal text-gray-500">
          <slot v-if="modalData == null">Cancel editing?</slot>
          <slot v-if="modalData == 'note'">
            Are you sure you want to delete this note?
          </slot>
        </h3>
        <button
          type="button"
          class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
          @click="confirm"
        >
          Yes
        </button>
        <button
          type="button"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
          @click="$emit('close')"
        >
          No
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 100%;
  width: 50%;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  z-index: 900;
  overflow-x: hidden;
  overflow-y: hidden;
}
</style>
