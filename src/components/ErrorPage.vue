<template lang="pug">
.app-container
  .task-list
    .error-container
      h1 Упс... 
      h2 Страница не найдена. Обратитесь к администратору
</template>

<script>
export default {
  name: "ErrorPage",

  mounted() {
    window.onpopstate = () => {
      if (this.$route.path !== "/") {
        this.$router.push("/").catch((e) => {
          console.log(e);
        });
      }
    };
  },
};
</script>
