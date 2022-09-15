<script setup>
const props = defineProps({
  note: Object,
});
</script>

<template>
  <div class="pt-8 pr-4 lg:w-1/3">
    <div class="h-full flex items-start bg-gray-100 p-8">
      <div class="flex-grow pl-6">
        <h1 class="title-font text-xl font-medium text-gray-900 mb-3">
          {{ props.note.name }}
        </h1>
        <p class="leading-relaxed mb-5">
          {{ props.note.todos.toString() }}
        </p>
        <div class="flex flex-row justify-between">
          <a class="text-indigo-500 inline-flex items-center"
            >Далее<svg
              class="w-4 h-4 ml-2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path></svg
          ></a>
          <button>Удалить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
