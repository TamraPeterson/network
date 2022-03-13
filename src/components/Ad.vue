<template>
  <img :src="ad.banner" alt="" />
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
export default {
  props: {
    ad: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      ads: computed(() => AppState.ads),
    };
  },
};
</script>


<style lang="scss" scoped>
img {
  height: 150px;
  width: 100%;
  object-fit: cover;
}
</style>