<template>

  <div class="container my-5">
    <div class="row">
      <div class="col-12-md sickFont">
        <h1 class="display-3-md">{{ event.name }}</h1>
      </div>
      <div class="col-5-md">
        <img class="img-fluid" :src="event.coverImg" alt="">
      </div>
      <div class="col-4-md">
        <div class="row sickFont my-4">
          <div class="col-12-md sickFont">
            <h5>{{ event.description }}</h5>
          </div>
          <div class="col-12-md my-3">
            <h5>{{ event.name }} will be at the {{ event.location }} at {{ new
                Date(event.startDate).toLocaleDateString('en-Us')
            }}</h5>
          </div>
          <div class="col-12">
            <h4>Tickets Remaining: {{ event.capacity }}</h4>
            <button class="btn btn-outline sickFont" 
            
            :disabled="isAttending == true" @click.prevent="createTicket()">Attend</button>
            <button v-if="!isCollaborator" class="btn btn-outline sickFont" @click="collab"><i class="mdi mdi-heart"></i>
              Like</button>
            <button v-else class="btn btn-danger" @click="removeCollab"><i class="mdi mdi-heart-broken"></i>
              Un-Like</button>
            <button type="button" class="btn btn-outline sickFont" data-bs-toggle="modal" data-bs-target="#commentModal">Comment</button>
          <div class="col-12-md" v-if="isAttending == true">
          <p>You're attending this event!</p>
          </div>
            <Modal id="commentModal" class="">
              <CommentForm  />
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
    <h2 class="mt-5 col-12-md text-start">Comments:</h2>
    </div>
    <div class="row" v-for="c in comments" :key="c.id">
    <div class="col-1">{{account.name}}</div>
      <CommentsCard class="col-11" :comment="c" />
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
                await ticketsService.getTicketByEventId(route.params.eventId);
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
        
        onMounted(() => {
            getEventById();
            getTicketsByEventId();
            getComments();
        });
        return {
            event: computed(() => AppState.activeEvent),
            ticket: computed(() => AppState.tickets),
            comments: computed(() => AppState.comments),
            account: computed(() => AppState.account),
            isAttending: computed(()=> {
              if (AppState.ticketsProfiles.find(t=> t.eventId == route.params.eventId)){
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
        

        };
    },
    components: { Modal, CommentForm, CommentsCard }
}
</script>

<style>
 .sickFont {
   font-family: MontereyFLF;
   color: antiquewhite;
 }

 .rojo {
  color: red;
 }
</style>