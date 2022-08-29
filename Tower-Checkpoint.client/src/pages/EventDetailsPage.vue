<template>
  <!-- <div class="container-fluid"> -->
  <div class="container my-5">
    <div class="row">
      <div class="col-6">
        <button v-if="event.creatorId == account.id" @click.prevent="deleteEvent(event)"
          class="col-1 btn btn-outline text-light">Cancel</button>
        <div class="col-12-md sickFont">
          <h1 class="display-1-md">{{ event.name }}</h1>
        </div>
        <div class="col-5-md">
          <img class="img-fluid glass" :src="event.coverImg" :title="event.name" alt="">
        </div>
      </div>
      <div class="col-1 borderRight"></div>
      <div class=" col-5 px-5">
        <div class="row sickFont my-4">
          <div class="col-12-md sickFont">
            <h5>{{ event.description }}</h5>
          </div>
        </div>
        <div class="col-12-md my-3">
          <h5>{{ event.name }} will be at the {{ event.location }} at {{ new
              Date(event.startDate).toLocaleDateString('en-Us')
          }}</h5>
        </div>
        <div class="col-12">
          <div v-if="event.isCanceled == true" class="bgRojo p-0 m-0">
            <h2 class="p-0 m-0 text-center text-dark sold">CANCELLED</h2>
          </div>
          <div v-if="event.capacity == 0" class="bgRojo">
            <h2 class="p-0 m-0 text-dark sold text-center">SOLD OUT</h2>
          </div>

          <div v-if="event.capacity == 0 || event.isCanceled == true"></div>
          <div v-else>
            <h4>Tickets Remaining: {{ event.capacity }}</h4>
            <button v-if="event.isCanceled == false || event.capacity > 0" class="btn btn-outline sickFont"
              :disabled="isAttending == true" @click.prevent="createTicket()">Attend</button>
            <button v-if='!collab' class="btn btn-outline sickFont" @click="collab"><i class="mdi mdi-heart"></i>
              Like</button>
            <button v-else class="btn btn-danger" @click="removeCollab"><i class="mdi mdi-heart-broken"></i>
              Un-Like</button>
            <button type="button" class="btn btn-outline sickFont" data-bs-toggle="modal"
              data-bs-target="#commentModal">Comment</button>
            <div class="" v-if="isAttending == true">
              <p>You're attending this event!</p>
            </div>
            <div class="">
              <h3>Look who else is coming!</h3>
            </div>
            <div class="row">
              <div class="col-1 p-0 my-1" v-for="c in tickets" :key="c.id">
                <TicketProfiles :ticket="c" />
              </div>
            </div>
          </div>


          <Modal id="commentModal" class="">
            <CommentForm />
          </Modal>
        </div>
      </div>
    </div>
    <div class="col-2">
      <!-- SECTION collab button hide if you are already a collaborator -->
    </div>
    <div class="col-7">
      <div class="row">
        <!-- COLLAB PROFILE -->
        <!--  -->
      </div>
    </div>
  </div>
  <div>
    <div class="">
      <h2 class="mt-5 col-12 text-start">Comments:</h2>
    </div>
    <div class="row m-5 rounded" v-for="c in comments" :key="c.id">
      <CommentsCard :comment="c" />
    </div>
  </div>





</template>

<script>
import { computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
import { commentsService } from "../services/CommentsService"
import { eventsService } from "../services/EventsService"
import { ticketsService } from "../services/TicketsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import Modal from "../components/Modal.vue"
import CommentForm from "../components/CommentForm.vue"
import CommentsCard from "../components/CommentsCard.vue"
import TicketProfiles from "../components/TicketProfiles.vue"
import EventBanner from "../components/EventBanner.vue"
import { accountService } from "../services/AccountService"


export default {
  setup() {
    const route = useRoute();
    async function getEventById() {
      try {
        await eventsService.getById(route.params.eventId);
      }
      catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    }
    async function getTicketsByEventId() {
      try {
        let eventTickets = await ticketsService.getTicketByEventId(route.params.eventId);
        logger.log('Event Tickets:', eventTickets)
      }
      catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    }
    async function getComments() {
      try {
        await commentsService.getEventComments(route.params.eventId);
      }
      catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    }

    async function getAccount() {
      try {
        await accountService.getAccount()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    }

    onMounted(() => {
      getEventById();
      getTicketsByEventId();
      getComments();
      getAccount();
    });
    return {
      event: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.tickets),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      isAttending: computed(() => {
        if (AppState.ticketsProfiles.find(t => t.eventId == route.params.eventId)) {
          return true
        }
        return false
      }),

      async createTicket() {
        try {

          let newTicket = {
            eventId: AppState.activeEvent.id
          }
          logger.log('New Ticket', newTicket)
          await ticketsService.create(newTicket)

        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async deleteEvent(event) {
        try {
          const yes = await Pop.confirm('Delete Event?')
          if (!yes) { return }
          await eventsService.deleteEvent(event.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },

      async deleteComment(comment) {
        try {
          const yes = await Pop.confirm('Delete Comment?')
          if (!yes) { return }
          logger.log(editable.value.eventId)
          await commentsService.deleteComment(comment.id)
          router.push({ name: 'EventDetails', params: { eventId: editable.value.eventId } })
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }


    };
  },
  components: { Modal, CommentForm, CommentsCard, TicketProfiles, EventBanner, EventBanner, EventBanner }
}
</script>

<style>
.sickFont {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: rgb(0, 0, 0);
}

.rojo {
  color: red;
}

.borderRight {
  border-right: 1px solid black;
}
</style>