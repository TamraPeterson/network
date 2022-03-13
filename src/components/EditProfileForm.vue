<template>
  <form @submit.prevent="editProfile">
    <div class="">
      <label for="" class="form-label">Bio</label>
      <input
        v-model="state.editable.bio"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>

    <div class="">
      <label for="" class="form-label">Photo</label>
      <input
        v-model="state.editable.imgUrl"
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>

    <div class="col-12 d-flex justify-content-end mt-3">
      <button class="btn btn-primary">Submit</button>
    </div>
  </form>
</template>
// bio, class, coverImg, email, github, graduated, linkedin, name, picture, resume,

<script>
import { Modal } from "bootstrap";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { reactive, ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
import { profilesService } from "../services/ProfilesService";
export default {
  setup() {
    const state = reactive({
      editable: {},
    });
    return {
      state,
      async editProfile() {
        try {
          await profilesService.editProfile(state.editable);
          state.editable = {};
          Modal.getOrCreateInstance(
            document.getElementById("form-modal")
          ).hide();
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
</style>