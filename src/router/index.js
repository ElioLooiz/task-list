import Vue from "vue";
import VueRouter from "vue-router";
import TaskList from "@/components/TaskList";
import CreateTask from "@/components/CreateTask";
import ErrorPage from "@/components/ErrorPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "tasks",
    component: TaskList,
  },
  {
    path: "/tasks/new",
    name: "newTask",
    component: CreateTask,
  },
  {
    path: "/tasks/:id",
    name: "editTask",
    component: CreateTask,
  },
  {
    path: "/error",
    name: "error",
    component: ErrorPage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
