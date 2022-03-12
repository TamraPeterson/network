<template>
  <form @submit.prevent="createPost">
    <div class="">
      <label for="" class="form-label">Description</label>
      <input
        v-model="state.editable.body"
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
      <button class="btn btn-primary">Post</button>
    </div>
  </form>
</template>


<script>
import { Modal } from "bootstrap";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { reactive, ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
export default {
  setup() {
    const state = reactive({
      editable: {},
    });
    return {
      state,
      async createPost() {
        try {
          await postsService.create(state.editable);
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