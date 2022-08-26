<template>
  <div class="col-1">
  <img class="img-fluid circle" :src="comment.creator.picture" alt=""><span class="mt-3">{{comment.creator.name}}</span>
  </div>
<div class="col-12-md bg-light text-dark rounded">
  <span class="selectable" @click.prevent="deleteComment(comment)">X</span>
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

.circle {
  border-radius: 50%;
}

</style>