<template>
  <form class="d-flex flex-column p-3">
    <label for="">Name</label>
    <input v-model="editable.name" type="text" />

    <label for="">Avatar</label>
    <input v-model="editable.picture" type="text" />

    <label for="">Banner Image</label>
    <input v-model="editable.coverImg" type="text" />

    <label for="">Class</label>
    <input v-model="editable.class" type="text" />

    <label for="">Bio</label>
    <input v-model="editable.bio" type="text" />

    <label for="">Github</label>
    <input v-model="editable.github" type="text" />

    <label for="">LinkedIn</label>
    <input v-model="editable.linkedin" type="text" />

    <label for="">Resume</label>
    <input v-model="editable.resume" type="text" />

    <button type="button" class="btn btn-primary mt-3" @click.prevent="update">
      Submit
    </button>
  </form>
</template>
// bio, class, coverImg, email, github, graduated, linkedin, name, picture, resume,

<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, ref, watchEffect } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { accountService } from "../services/AccountService";
export default {
  setup() {
    const editable = ref({});
    watchEffect(() => {
      editable.value = AppState.account;
    });
    return {
      editable,
      async update() {
        try {
          await accountService.update(editable.value);
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