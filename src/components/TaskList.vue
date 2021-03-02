<template lang="pug">
.app-container
  .task-list(v-if="!loading")
    .task-container
      TaskItem(v-for="task of tasks", :key="task.id" :task="task") 
    button(type='submit' @click="addTaskClick" class="button-custom") Добавить

  Preloader(:isLoading="loading")
      
</template>

<script>
import TaskList from "@/components/TaskList";
import TaskItem from "@/components/TaskItem";
import { APIWorker } from "@/components/APIWorker.js";

export default {
  name: "app",
  components: {
    TaskList,
    TaskItem,
  },

  data() {
    return {
      tasks: [],
      timeoutId: null,
    };
  },

  mixins: [APIWorker],

  created() {
    this.getTaskList();
  },

  methods: {
    addTaskClick() {
      this.$router.push("tasks/new");
    },
  },
};
</script>
