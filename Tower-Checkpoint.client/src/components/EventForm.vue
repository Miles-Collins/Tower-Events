<template>


  <form @submit.prevent="handleSubmit" class="row bg-white text-dark p-4  eventFont">
    <div class="col-12 text-center mb-2">
      <h2>Create Event</h2>
    </div>
    <div class="col-6">
      <label for="" class="form-label">Title</label>
      <input type="text" v-model="editable.name" class="form-control" name="name" id="name">
    </div>
    <div class="col-6">
      <label for="" class="form-label">Cover Image</label>
      <input type="url" v-model="editable.coverImg" class="form-control" name="coverImg" id="coverImg"
        aria-describedby="helpId" placeholder="">
    </div>
    <div class="col-6">
      <label for="" class="form-label">Location</label>
      <input type="text" v-model="editable.location" class="form-control" name="location" id="location"
        aria-describedby="helpId" placeholder="">
    </div>
    <div class="col-6">
      <label for="" class="form-label">Date</label>
      <input type="date" v-model="editable.startDate" class="form-control" name="startDate" id="startDate"
        aria-describedby="helpId" placeholder="">
    </div>
    <div class="col-6">
      <label for="" class="form-label">Tickets</label>
      <input type="text" v-model="editable.capacity" class="form-control" name="capacity" id="capacity"
        aria-describedby="helpId" placeholder="">
    </div>
    <div class="col-6">
      <label for="" class="form-label ">Category</label>
      <select v-model="editable.type" name="type" id="type" class="form-control">
        <option value="convention">Convention</option>
        <option value="sport">Sport</option>
        <option value="digital">Digital</option>
        <option value="concert">Concert</option>
        <option value="food">Food</option>
        <option value="travel">Travel</option>
        <option value="health">Health</option>
      </select>
    </div>
    <div class="col-12">
      <label for="" class="form-label">Description</label>
      <textarea v-model="editable.description" name="description" id="description" cols="30" rows="5"
        class="form-control"></textarea>
    </div>

    <button class="col-12 pt-3 btn btn-outline">
      <h2>Submit</h2>
    </button>

  </form>

  <!-- creatorId: { type: ObjectId, required: true, ref:'Account'},
  name: {type: String, required: true,},
  description: {type: String, required: true, },
  coverImg: { type: String, required: true,},
  location: { type: String, required: true,},
  capacity: { type: Number, required: true, min: 0},
  startDate: { type: Date, required: true},
  isCanceled: {type: Boolean, required: true, default: false},
  type: {type: String, enum: ['convention', 'sport', 'digital', 'concert'], required: true, lowercase: true, default: 'concert'}, -->

</template>

<script>
import { ref } from "vue";
import { router } from "../router";
import { eventsService } from "../services/EventsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";


export default {
  props: { event: { type: Object, required: true } },

  setup() {
    const editable = ref({})
    return {
      editable,
      async handleSubmit() {
        try {
          logger.log('Creating Event', editable.value)
          const event = await eventsService.createEvent(editable.value)
          router.push({ name: 'EventDetails', params: { eventId: event.id } })
          Pop.success('Event Created!')

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
 .eventFont {
   font-size: 1.1em;
   font-family: MontereyFLF;
   color: antiquewhite;
 }
</style>