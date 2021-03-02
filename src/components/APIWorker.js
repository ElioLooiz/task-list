import { baseURL } from "@/constants.js";
import axios from "axios";

export const APIWorker = {
  data() {
    return {
      tasks: [],
      task: null,
      loading: false,
    };
  },
  methods: {
    getTaskList() {
      this.loading = true;
      axios
        .get(baseURL)
        .then((res) => {
          this.tasks = res.data.reverse();
          this.loading = false;
        })
        .catch((e) => {
          console.error(e);
        });
    },

    getCurrentTask(_id) {
      this.loading = true;
      axios
        .get(baseURL + "/" + _id)
        .then((res) => {
          this.task = res.data;
          if (res.status === 404) {
            this.$router.push("/error");
          } else {
            this.loading = false;
          }
        })
        .catch((e) => {
          this.$router.push("/error");
          console.error(e);
        });
    },

    deleteTask(_id) {
      axios
        .delete(baseURL + "/" + _id)
        .then((res) => {
          if (res.status === 200) {
            this.$router.push("/");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    addTask(_task) {
      axios
        .post(baseURL, _task)
        .then((res) => {
          if (res.status === 201) {
            this.$router.push("/tasks/" + res.data.id);
          } else {
            this.$router.push("/error");
          }
        })
        .catch((e) => {
          this.$router.push("/error");
          console.log(e);
        });
    },

    updateTask(_task) {
      axios.patch(baseURL + "/" + _task.id, _task).then((res) => {
        if (res.status === 200) {
          this.$router.push("/");
          this.task = res.data;
        }
      });
    },
  },
};
