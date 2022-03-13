<template>
  <div class="container-fluid shadow border-dark">
    <div class="profile-info">
      <div class="row">
        <img class="coverPhoto rounded" :src="profile.coverImg" alt="" />
      </div>
      <div class="row justify-content-end">
        <div
          class="col-2 text-end selectable"
          v-if="account.id == profile.id"
          data-bs-toggle="modal"
          data-bs-target="#form-modal"
        >
          Edit Profile <i class="mdi mdi-pencil"></i>
        </div>
      </div>
      <div class="row justify-content-center p-4">
        <div class="col-4 text-center">
          <img
            class="img-fluid pic p-3 rounded"
            :src="profile.picture"
            alt=""
          />
          <h3 class="p-2">{{ profile.name }}</h3>
        </div>
        <div class="col-4 p-5">
          <h6>Bio: {{ profile.bio }}</h6>
          <!-- need social media links, alumni status, and class v-if="profile.graduated"-->
        </div>
        <div class="col-4 p-5 icons">
          <h5>
            <div>
              <i
                class="mdi mdi-school text-end p-1 selectable"
                v-if="profile.graduated"
              ></i>
            </div>
            <div>
              <i
                class="mdi mdi-linkedin text-end p-1 selectable"
                v-if="profile.linkedin"
              ></i
              >{{ profile.linkedin }}
            </div>
            <i
              class="mdi mdi-github text-end p-1 selectable"
              v-if="profile.github"
            ></i
            >: {{ profile.github }}
            <i
              class="mdi mdi-email text-end p-1 selectable"
              v-if="profile.email"
            ></i
            >: {{ profile.email }}
          </h5>
        </div>
        <div></div>
      </div>
    </div>
    <div class="row justify-content-between pt-3 text-center">
      <div
        class="col-4 selectable"
        @click="getNewer()"
        title="getNewer"
        v-if="newerPage"
      >
        <i class="mdi mdi-chevron-left"></i>Newer
      </div>
      <div
        class="col-4 selectable"
        @click="getOlder()"
        title="getOlder"
        v-if="olderPage"
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
    <Modal>
      <template #modal-title>Edit Profile</template>
      <template #modal-body><EditProfileForm /></template>
    </Modal>
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
      account: computed(() => AppState.account),
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
      async editProfile(id) {
        try {
          profilesService.editProfile(id);
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