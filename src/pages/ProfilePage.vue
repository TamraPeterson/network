<template>
  <div class="container-fluid shadow">
    <div class="row justify-content-center">
      <div class="col-10 text-center">
        <img class="coverPhoto" :src="profile.coverImg" alt="" />
        <img class="img-fluid pic p-3" :src="profile.picture" alt="" />
        <h1 class="p-2">{{ profile.name }}</h1>
        <div>
          {{ profile.bio }}
        </div>
      </div>
    </div>
    <div class="row justify-content-between pt-3 text-center">
      <div
        class="col-4 selectable"
        @click="getNewer()"
        title="getNewer"
        :disabled="newerPage == null"
      >
        <i class="mdi mdi-chevron-left"></i>Newer
      </div>
      <div
        class="col-4 selectable"
        @click="getOlder()"
        title="getOlder"
        :disabled="olderPage == null"
      >
        Older
        <i class="mdi mdi-chevron-right"></i>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-9 p-3" v-for="p in posts" :key="p.id">
        <Post :post="p" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { useRoute } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import { profilesService } from "../services/ProfilesService";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const route = useRoute();
    onMounted(async () => {
      try {
        if (route.name == "Profile") {
        }
        await profilesService.getProfile(route.params.id);
        await postsService.getPostsByProfile(route.params.id);
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      profile: computed(() => AppState.profile),
      posts: computed(() => AppState.posts),
      olderPage: computed(() => AppState.olderPage),
      newerPage: computed(() => AppState.newerPage),
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


<style lang="scss" scoped>
.pic {
  height: 300px;
  width: 300px;
  object-fit: cover;
}
.coverPhoto {
  height: 300px;
  width: 100%;
  object-fit: cover;
}
</style>