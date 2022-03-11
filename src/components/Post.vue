<template>
  <div class="container-fluid p-3 bg-light shadow">
    <p>{{ post.createdAt }}</p>
    <img class="img-fluid" :src="post.imgUrl" alt="" />
    <h4>
      <img
        @click="goTo()"
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
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    return {
      route,
      goTo() {
        router.push({ name: "Profile", params: { id: props.post.creatorId } });
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