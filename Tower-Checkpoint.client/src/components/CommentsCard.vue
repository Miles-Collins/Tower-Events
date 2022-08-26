<template>
  <div class="col-2 bgComment text-dark">
    <div class="">
      <div class="row profileBorder justify-content-center">
        <img class="img-fluid circle col-6 mt-2 " :src="comment.creator.picture" alt="">
        <span class="mt-3 text-start col-12 mb-2 text-center">{{ comment.creator.name }}</span>
      </div>
    </div>
  </div>

  <div class="col-10 bgComment text-dark">
  <div class='row'>
    <span class="selectable text-end" @click.prevent="deleteComment(comment)">X</span>
  </div>
 
  <div>
    <p>{{ comment.body }}</p>
  </div>
</div>

</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { AppState } from "../AppState";
import { router } from "../router";
import { commentsService } from "../services/CommentsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";


export default {
  props: { comment: { type: Object, required: true } },


  setup() {

    onMounted(() => console.log(AppState.commentProfiles))

    return {
      commentProfiles: computed(() => AppState.commentProfiles),

  async deleteComment(comment) {
        try {
          const yes = await Pop.confirm('Delete Comment?')
          if (!yes) {return}
          await commentsService.removeComment(comment.id)
          logger.log(comment.eventId)
          router.push({ name: 'EventDetails', params: {eventId: comment.eventId}})
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }

    };

  }
}
</script>

<style>
.circle {
  border-radius: 50%;
}

.bgComment {
  background-color: antiquewhite;
}

.profileBorder {
  border-right: solid rgb(196, 185, 171) 2px;
}
</style>