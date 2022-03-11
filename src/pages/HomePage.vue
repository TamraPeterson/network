<template>
  <div class="container-fluid">
    <div class="row justify-content-between pt-3 text-center">
      <div
        class="col-4 selectable"
        @click="getNewer()"
        title="Previous"
        :disabled="currentPage == 1"
      >
        <i class="mdi mdi-chevron-left"></i>Newer
      </div>
      <div
        class="col-4 selectable"
        @click="getOlder()"
        title="Next"
        :disabled="currentPage === totalPages"
      >
        Older
        <i class="mdi mdi-chevron-right"></i>
      </div>
    </div>
    <div class="row justify-content-center">
      <!-- <div class="col-3 p-3 height-100">Sidebar</div> -->
      <div class="col-9 p-3" v-for="p in posts" :key="p.id">
        <Post :post="p" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";
export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await postsService.getAllPosts();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      posts: computed(() => AppState.posts),
      totalPages: computed(() => AppState.totalPages),
      currentPage: computed(() => AppState.allPages),
      async getNewer() {
        try {
          await postsService.getNewer();
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      async getOlder() {
        try {
          await postsService.getOlder();
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>

<style scoped lang="scss">
</style>
