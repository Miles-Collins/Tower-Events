<template>
  <div class="bg-dark rounded ticketBackground">
    <img class="change mt-3" :src="ticket.event.coverImg" alt="">
    <p class="text-center p-0 m-0 text-dark">{{ticket.event.name}}</p>
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

.ticketBackground {
   background-image: url(../assets/img/Ticket.png);
   background-position: center;
   background-size: cover;
   height: 100 px;
 }

.change {
  height: 100px;
}

</style>