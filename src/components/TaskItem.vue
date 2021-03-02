<template lang="pug">
div(:class="'status' + task.status")
  .task-item(@click="onTaskClick(task.id)") 
    p Задача:
      span {{ task.title }}
    .task-description Описание:
      span {{ task.description }}
    p Дата создания:
      span {{ task.created_date | date('datetime') }}
</template>

<script>
export default {
  name: "Task",
  data() {
    return {};
  },
  props: {
    task: {
      type: Object,
      required: false,
    },
  },

  methods: {
    onTaskClick(_id) {
      if (!this.timeoutId) {
        this.timeoutId = setTimeout(() => {
          this.timeoutId = null;
          //Одиночный клик по задаче
        }, 200);
      } else {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
        this.$router.push(`tasks/${_id}`);
      }
    },
  },
};
</script>
