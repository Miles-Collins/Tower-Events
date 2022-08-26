<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="circle" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

<div class="row m-auto">
  <div class="col-3 offset-5"><h2>Edit Account:</h2></div>
  <div class="col-6 m-auto ">
 <AccountForm />
  </div> 
</div>

  <div class="row">
      <div class="col-12 text-center"><h1>Your Tickets:</h1></div>
      <div class="col-3 text-center my-3" v-for="t in tickets" :key="t.id">
        <button class="btn btn-outline text-light" @click="deleteTicket()"><i class="mdi mdi-delete-forever"></i>
          Delete</button>
        <EventTicket :ticket="t" />
      </div>
    
 
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { ticketsService } from "../services/TicketsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import EventTicket from "../components/EventTicket.vue"
export default {
  name: "Account",
  setup() {
    async function getTickets() {
      try {
        await ticketsService.getTicketByAccountId();
      }
      catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    }


    onMounted(() => {
      getTickets();
    });
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.ticketsProfiles),
      ticket: computed(() => AppState.tickets),
      event: computed(() => AppState.events),
      isArchived: computed(() => {
        if (AppState.ticketsProfiles.isArchived = false) { }
      }),

      async deleteTicket() {
        try {
          const yes = await Pop.confirm('Delete your ticket?')
          if (!yes) { return }
          let ticket = AppState.ticketsProfiles.find(t => t.accountId == AppState.account.id)
          logger.log('Ticket ID:', ticket.id,)
          logger.log('Accound ID:', AppState.account.id, 'Ticket AccountID', ticket.accountId)
          await ticketsService.delete(ticket.id)
          logger.log()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
    };
  },
  components: { EventTicket }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
