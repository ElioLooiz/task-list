<template lang="pug">
.app-container
  .createTask-form.task-list(v-if="!loading")
    h1(v-if="createMode" class="create-task-header") Добавить новую задачу
    h1(v-else class="create-task-header") Редактирование задачи
    
    .input-container
      h3(v-if="validError" class="error-msg") Пожалуйста, заполните обязательные поля формы
      .input-row
        p Название:
        input(type="text", v-model="task.title" class="task-input" :class='{"task-input-red": this.validError && !this.task.title.trim() }' )
      
      .input-row
        p Описание:
        input(type="text", v-model="task.description" @keyup.enter="addTaskClick" class="task-input" :class='{"task-input-red": this.validError && !this.task.description.trim() }')

      .input-row( v-if="!createMode")
        p Состояние:
        select( v-model="task.status" class="task-input")
          option(v-for="status of statuses" :key="status.id" :value="status.id" class="task-input") {{status.title}}

      .date-row( v-if="!createMode")
        p Дата изменения: 
        div {{task.created_date | date("datetime")}}
    
    button(type='submit' @click="addTaskClick" v-if="createMode" class="button-custom") Добавить
    .button-menu(v-else)
      button(type='submit' @click="updateTaskClick" class="button-custom") Изменить
      button(type='submit' @click="deleteTask(task.id)" class="button-custom" ) Удалить
      
  Preloader(:isLoading="loading")
    
</template>

<script>
import { statuses, onlyNumRegex } from "@/constants.js";
import { APIWorker } from "@/components/APIWorker.js";

export default {
  name: "CreateTask",
  data() {
    return {
      statuses,
      task: {
        title: "",
        description: "",
        status: 1,
        created_date: null,
      },
      createMode: true,
      validError: false,
    };
  },

  mixins: [APIWorker],

  created() {
    this.init();
    window.onpopstate = () => {
      if (this.$route.path !== "/") {
        this.$router.push("/").catch((e) => {
          console.log(e);
        });
      }
    };
  },

  watch: {
    $route() {
      this.init();
    },
  },

  methods: {
    init() {
      this.createMode = false;
      if (
        !!this.$route.params.id &&
        this.$router.currentRoute.params.id.search(onlyNumRegex) !== -1
      ) {
        /**
         * Если параметр числовое значение.
         * Пытаемся получить текущую задачу с сервера. Устанавливаем мод Редактирования задачи
         */
        this.createMode = false;
        this.getCurrentTask(this.$route.params.id);
      } else if (this.$router.currentRoute.path === "/tasks/new") {
        /**
         * Если выполнен переход на страницу создания нового таска.
         * Устанавливаем соответствующий тип отображения
         */

        this.createMode = true;
      } else {
        /**
         * Переходы по некорректным URL блокируем. Редирект на страницу ошибки.
         */
        this.$router.push("/error");
      }
    },

    addTaskClick() {
      this.validError = false;
      if (this.task.title.trim() && this.task.description.trim()) {
        this.task.created_date = new Date();
        this.addTask(this.task);
      } else {
        this.validError = true;
      }
    },

    updateTaskClick() {
      this.validError = false;
      if (this.task.title.trim() && this.task.description.trim()) {
        this.task.created_date = new Date();
        this.updateTask(this.task);
      } else {
        this.validError = true;
      }
    },
  },
};
</script>
