<template>
  <div class="bg-dark p-2 rounded">
    <p class="text-center p-0 m-0">{{ticket.event.name}}</p>
    <img class="img-fluid" :src="ticket.event.coverImg" alt="" srcset="">
    <!-- <button class="btn btn-danger" @click.prevent="deleteTicket"><i class="mdi mdi-delete-forever"></i></button> -->
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import { eventsService } from "../services/EventsService";
import { ticketsService } from "../services/TicketsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";


export default {
  props: { ticket: { type: Object, required: true } },


  setup() {

    async function getEvents() {
      try {
        await eventsService.getEvents();
      }
      catch (error) {
        logger.error("[Getting Events]", error);
        Pop.toast(error.message, "error");
      }
    }
    onMounted(() => {
      getEvents()
    })

    return {
      tickets: computed(() => AppState.tickets),
      event: computed(() => AppState.activeEvent),
    };

  }
}
</script>

<style>
</style>