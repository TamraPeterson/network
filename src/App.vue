<template>
  <header>
    <Navbar />
  </header>
  <div class="row justify-content-center">
    <div v-for="a in ads" :key="a.index" class="col-12 m-2 text-center">
      <Ad :ad="a" />
    </div>
  </div>

  <main>
    <router-view />
  </main>

  <footer>
    <div class="bg-primary text-light text-center p-4">
      Made with 😭 by Tamra
    </div>
  </footer>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState),
      ads: computed(() => AppState.ads),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
