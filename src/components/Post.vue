<template>
  <div class="container-fluid p-3 bg-light shadow">
    <img class="img-fluid" :src="post.imgUrl" alt="" />
    <h4>
      <img
        @click="goTo"
        class="img-fluid profile-img m-3 selectable"
        :src="post.creator.picture"
        alt=""
      />{{ post.creator.name }}
      :
    </h4>
    <h6 class="ps-4 p-2">{{ post.body }}</h6>
    <h4 class="ml-auto">
      <i
        class="mdi mdi-heart-outline selectable"
        title="like post"
        @click="like(post.id)"
      ></i
      >{{ post.likes.length }}
    </h4>
  </div>
  <div class="d-flex justify-content-between">
    <small>{{ new Date(Date.parse(post.createdAt)) }}</small>
    <i
      class="mdi mdi-delete selectable"
      title="delete post"
      @click="remove(post.id)"
    ></i>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { postsService } from "../services/PostsService";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { AppState } from "../AppState";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    return {
      posts: computed(() => AppState.posts),
      likes: computed(() => AppState.posts.likes),
      route,
      goTo() {
        router.push({ name: "Profile", params: { id: props.post.creatorId } });
      },
      async like(id) {
        try {
          await postsService.like(id);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      async remove(id) {
        if (await Pop.confirm()) {
          try {
            await postsService.remove(id);
          } catch (error) {
            logger.error(error);
            Pop.toast(error.message, "error");
          }
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.profile-img {
  height: 40px;
  width: 40px;
  border-radius: 50px;
}
</style>