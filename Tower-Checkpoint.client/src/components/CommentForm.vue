<template>

  <form @submit.prevent="handleSubmit" class="row bg-dark p-4 pb-0 pt-2 rounded">
    <span class="selectable" @click="deleteComment(comment)">X</span>
    <h2>Leave Comment</h2>
    <textarea v-model="editable.body" name="body" id="body" cols="30" rows="10"></textarea>
    <button class="col-6 btn btn-outline offset-3 my-2 text-light">Submit</button>
  </form>

</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
import { commentsService } from "../services/CommentsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";


export default {



  setup() {
    const editable = ref({})
    const route = useRoute()
    return {
      editable,
      async handleSubmit() {
        try {
          editable.value.eventId = route.params.eventId
          logger.log('Creating Comment', editable.value)
          await commentsService.create(editable.value)
          Pop.success('Comment Created')
        } catch (error) {
          logger.error(error)
          Pop.error(error.message, 'error')
        }
      },
      
    };

  }
}
</script>

<style>
</style>