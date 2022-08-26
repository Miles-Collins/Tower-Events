<template>

<form class="card account-form font" @submit.prevent="handleSubmit">
    <div class="card-body text-start">
      <div>
        <label for="name">Name:</label>
        <input type="text" class="form-control" v-model="editable.name" >
      </div>
      <div>
        <label for="picture">Picture:</label>
        <input type="url" class="form-control" v-model="editable.picture"  placeholder="picture">
      </div>
      <div>
        <label for="coverImg">Cover Image:</label>
        <input type="url" class="form-control" v-model="editable.coverImg" >
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="text" class="form-control" v-model="editable.email" >
      </div>
      <div>
        <label for="github">Github:</label>
        <input type="url" class="form-control" v-model="editable.github" >
      </div>
      <div>
        <label for="linkedin">Linkedin:</label>
        <input type="text" class="form-control" v-model="editable.linkedin" >
      </div>
      <div>
        <label for="resume">Resume:</label>
        <input type="text" class="form-control" v-model="editable.resume" >
      </div>
        <div>
          <label for="graduated">Graduated:</label>
          <input type="checkbox" class="form" v-model="editable.graduated">
        </div>
      <div>
        <label for="bio">Bio:</label>
        <textarea type="text" class="form-control" v-model="editable.bio" required name="bio" rows="8"
          style="resize:none"></textarea>
      </div>
      <div>
        <button type="submit" class="btn btn-primary w-100 mt-2">Save</button>
      </div>
    </div>
  </form>

</template>

<script>
import { watchEffect } from "vue";
import { AppState } from "../AppState";
import { router } from "../router";
import { accountService } from "../services/AccountService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";


export default {



setup() {

const editable = ref({})

watchEffect(() => {
  if (!AppState.account) { return }
  editable.value = {...AppState.account}
})

  return {
    editable,
    async handleSubmit() {
      try {
        await accountService.edit(editable.value)
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

</style>