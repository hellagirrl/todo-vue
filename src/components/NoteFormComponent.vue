<template>
  <form action="|" class="flex flex-row justify-between mr-4">
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-8"
      id="note"
      type="text"
      placeholder="Название заметки"
    />
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-8"
      id="todos"
      type="text"
      placeholder="Задачи"
    />
    <button
      class="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
      type="button"
    >
      Добавить
    </button>
  </form>
</template>

<script>
export default {};
</script>

<style></style>
