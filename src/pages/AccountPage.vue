<template>
  <div class="about text-center">
    <h1 class="p-3">Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p class="p-3">
      {{ account.email }}
    </p>

    <router-link
      :to="{ name: 'Profile', params: { id: account.id } }"
      class="btn btn-primary mt-4 selectable text-uppercase"
    >
      View/Edit Your Profile
    </router-link>
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState";
export default {
  name: "Account",
  setup() {
    return {
      account: computed(() => AppState.account),
    };
  },
};
</script>

<style scoped>
img {
  max-width: 300px;
}
</style>
