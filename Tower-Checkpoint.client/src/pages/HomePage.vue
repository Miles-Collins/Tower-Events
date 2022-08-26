<template>

<HomePageBanner />
<!-- <HomeSortBar /> -->
<div class="container-fluid">
    <div class="row">
    
          <div class="col-12 my-4 sortFont ">
    <h2 class="text-center">Check out trending categories <span class="sortEmblem"><i class="mdi mdi-filter"></i></span>
    </h2>
  <div class="row justify-content-between pt-4 px-4 buttonFont">
    <div class="col-2 btn btn-outline-light rounded-pill buttonFont" @click="filterEvent = ''">All</div>
    <div class="col-2 btn btn-outline-light rounded-pill buttonFont" @click="filterEvent = 'sporting'">Sporting</div>
    <div class="col-2 btn btn-outline-light rounded-pill buttonFont" @click="filterEvent = 'convention'">Convention</div>
    <div class="col-2 btn btn-outline-light rounded-pill buttonFont" @click="filterEvent = 'digital'">Digital</div>
    <div class="col-2 btn btn-outline-light rounded-pill buttonFont" @click="filterEvent = 'concert'">Concert</div>
  </div>
      </div>
    
    </div>
  <div class="row mx-5">
    <div v-for="e in events" :key="e.id" class="col-3">
      <EventCard :event="e" />
    </div>
  </div>
</div>
</template>

<script>
import { onMounted, computed, ref } from "vue"
import { AppState } from "../AppState"
import { eventsService } from "../services/EventsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import EventCard from "../components/EventCard.vue"
import HomePageBanner from "../components/HomePageBanner.vue"
import HomeSortBar from "../components/HomeSortBar.vue"



export default {
    setup() {
        const filterEvent = ref('')
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
            getEvents();
        });
        return {
            filterEvent,
            events: computed(() => AppState.events.filter(e => filterEvent.value ? e.type == filterEvent.value : true))
        };
    },
    components: { EventCard, HomePageBanner, HomeSortBar }
}
</script>

<style> 
 .sortFont {
   font-size: 1.2em;
   font-family: MontereyFLF;
   color: antiquewhite
 }

 .sortEmblem {
   font-size: .5em;
   font-family: MontereyFLF;
 }

 .buttonFont {
   color: antiquewhite;
   border-color: antiquewhite;
 }
</style>



<!-- 
[X] USERS CAN REGISTER, LOGIN, AND LOGOUT
[X] AT LEAST 3 SUPPORTED FRONT-END ROUTES, HOME, EVENTSDETAILS, ACCOUNT
[X] THE HOME PAGE SHOWS ALL EVENTS (PAGINATION ALLOWED)
[X] EVENT CARD DISPLAYS AT LEAST THE TITLE AND IMAGE
[X] EVENTS CAN BE SORTED OR FILTERED BY THEIR TYPE
[X] EVENTS CAN BE CREATED
[X] CREATING A NEW EVENT AUTOMATICALLY NAVIGATES TO THE EVENTSDETAILS PAGE FOR THAT EVENT
[X] UI PREVENTS USERS FROM CREATING MULTIPLE TICKETS FROM AN EVENT
[X] EVENTS CAN HAVE COMMENTS ADDED AND REMOVED ON THE EVENTSDETAILS PAGE
[X] USERS CAN CHOOSE TO 'ATTEND' AN EVENT, CREATING A RELATIONSHIP (TICKET) BETWEEN USER AND EVENT
[X] API PASSES ALL POSTMAN TEST
[X] USERS CAN SEE ALL THE EVENTS THEY ARE ATTENDING (HAVE TICKETS TO)
[] THE EVENTDETAILS PAGE DISPLAYS ALL EVENT PROPERTIES, THE COMMENTS FOR THAT EVENT, AND IMAGES OF ALL TICKET HOLDERS WITH A TITLE ATTRIBUTE OF THE TICKET HOLDER'S NAME
[] THE OWNER OF AN EVENT CAN CANCEL THE EVENT FROM THE EVENTSDETAILS PAGE
[] COMMENTS SHOW THEIR AUTHORS NAME AND IMAGE
[] UI PREVENTS USERS FROM JOINING AN EVENT (CREATE TICKET) IF AN EVENT IS CANCELED OR DOES NOT HAVE THE AVAILABLE CAPACITY REMAINING
[] STYLING INDICATION ON EVENTDETAILS PAGE THAT AN EVENT IS CANCELED OR SOLD OUT (COLOR, STRIKE-THROUGH, ECT.)
[] USERS CAN DELETE THEIR TICKET FOR AN EVENT
[X] APP ADHERES TO PHASE I, AND II OF DESIGN REQUIREMENTS
 -->