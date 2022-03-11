<template>
  <div class="container-fluid p-3 bg-light shadow">
    <img class="img-fluid" :src="post.imgUrl" alt="" />
    <h4>
      <img
        @click="goTo('Profile')"
        class="img-fluid profile-img m-3 selectable"
        :src="post.creator.picture"
        alt=""
      />{{ post.creator.name }}
      :
    </h4>
    <h6 class="ps-4 p-2">{{ post.body }}</h6>
  </div>
</template>


<script>
import { useRoute, useRouter } from "vue-router";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    return {
      route,
      goTo(page) {
        router.push({ name: page });
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
.profile-img :hover {
}
</style>