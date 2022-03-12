<template>
  <div class="container-fluid p-3 bg-light shadow">
    <h4>
      <p>{{ profile.name }}</p>
      <img class="img-fluid" :src="profile.picture" alt="" />
    </h4>
    <h6 class="ps-4 p-2">{{ profile.email }}</h6>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
export default {
  allProfiles: {
    profile: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      allProfiles: computed(() => AppState.allProfiles),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>