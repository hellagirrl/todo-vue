<script setup>
const props = defineProps(['onConfirm', 'modalData']);

defineEmits(['close']);

const confirm = () => {
  if (props.onConfirm) props.onConfirm();
};
</script>

<template>
  <div
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center bg-black bg-opacity-60"
    aria-hidden="true"
  >
    <div class="modal">
      <div class="absolute p-4 w-full max-w-md h-full md:h-auto">
        <div class="relative bg-white rounded-lg shadow">
          <div class="p-6 text-center">
            <h3 class="mb-5 text-lg font-normal text-gray-500">
              <slot v-if="modalData == null">Отменить редактирование?</slot>
              <slot v-if="modalData == 'note'">Удалить заметку?</slot>
              <slot v-if="modalData == 'todo'">Удалить эту задачу?</slot>
            </h3>
            <button
              type="button"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              @click="confirm"
            >
              Да
            </button>
            <button
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
              @click="$emit('close')"
            >
              Нет
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 400px;
  margin-left: -150px;
}
</style>
