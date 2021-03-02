<template lang="pug">
  .task-list(v-if="this.$props.isLoading")
    .container 
      .dash.first
      .dash.sec
      .dash.third
      .dash.fourth
</template>

<script>
export default {
  name: "Preloader",
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
