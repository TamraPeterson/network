<template>
  <div class="row justify-content-center">
    <div class="col-6">
      <form @submit.prevent="search">
        <input
          v-model="searchText"
          type="search"
          class="form-control rounded"
          placeholder="Search All Posts"
          aria-label="Search"
          aria-describedby="search-addon"
        />
        <button type="button" class="btn btn-primary text-white text-center">
          Search
        </button>
      </form>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity";
import { postsService } from "../services/PostsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { onMounted } from "@vue/runtime-core";
import { profilesService } from "../services/ProfilesService";

export default {
  setup() {
    const searchText = ref("");
    return {
      searchText,
      async search() {
        try {
          await postsService.getAllPosts({ query: searchText.value });
          await profilesService.getAllProfiles({ query: searchText.value });
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