<template>
  <div class="container-fluid">
    <b
      v-if="account.id"
      title="Create Post"
      class="
        create-btn
        btn btn-primary
        rounded-pill
        shadow
        d-flex
        align-items-center
        justify-content-center
      "
      data-bs-toggle="modal"
      data-bs-target="#form-modal"
    >
      <i class="mdi mdi-plus"></i>
    </b>
    <div class="row">
      <div class="col-12 m-2" v-for="a in ads" :key="a.id">
        <Ad :ad="a" />
      </div>
    </div>
    <div class="row justify-content-center p-4">
      <Search />
    </div>
    <div class="row justify-content-center pt-3 text-center">
      <div
        class="col-4 selectable"
        @click="getNewer()"
        title="Previous"
        v-if="newerPage"
      >
        <i class="mdi mdi-chevron-left"></i>Newer
      </div>
      <div
        class="col-4 selectable"
        @click="getOlder()"
        title="Next"
        v-if="olderPage"
      >
        Older
        <i class="mdi mdi-chevron-right"></i>
      </div>
    </div>
    <div class="row justify-content-center">
      <!-- <div class="col-3 p-3 height-100">Sidebar</div> -->
      <div class="col-7 p-3" v-for="p in posts" :key="p.id">
        <Post :post="p" />
      </div>
    </div>
    <Modal>
      <template #modal-title>New Post</template>
      <template #modal-body><NewPostForm /></template>
    </Modal>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { postsService } from "../services/PostsService";
import { adsService } from "../services/AdsService";

import { AppState } from "../AppState";
export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await postsService.getAllPosts();
        await adsService.getAds();
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      posts: computed(() => AppState.posts),
      olderPage: computed(() => AppState.olderPage),
      newerPage: computed(() => AppState.newerPage),
      account: computed(() => AppState.account),
      profiles: computed(() => AppState.profile),
      ads: computed(() => AppState.ads),
      async getNewer() {
        if (AppState.newerPage === null) {
          return;
        } else {
          try {
            await postsService.getNewer();
          } catch (error) {
            logger.error(error);
            Pop.toast(error.message, "error");
          }
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
.create-btn {
  font-size: 20px;
  height: 60px;
  width: 60px;
  z-index: 100;
  position: fixed;
  top: 12vh;
  left: 5vh;
}
</style>
