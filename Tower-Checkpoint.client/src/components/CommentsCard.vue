<template>

<div class="col-12-md my-3 bg-light text-dark rounded">
  <span class="selectable" @click.prevent="deleteComment(comment)">X</span>
    <img :src="comment.name" alt="">
    <p>{{comment.body}}</p>
  </div>

</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { AppState } from "../AppState";
import { commentsService } from "../services/CommentsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";


export default {
props: {comment: { type: Object, required: true}},


setup() {

onMounted(() => console.log(AppState.commentProfiles))

  return {
  commentProfiles: computed (() => AppState.commentProfiles),
 
  };

  }
}
</script>

<style> 

</style>