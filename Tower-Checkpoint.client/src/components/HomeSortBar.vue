<template>

  <div class="col-11 offset-1 my-4 sortFont ">
    <h2 class="text-center">Check out trending categories <span class="sortEmblem"><i class="mdi mdi-filter"></i></span>
    </h2>
  </div>
  <div class="row justify-content-between mx-5 buttonFont">
    <div class="col-2 btn btn-outline-light rounded-pill buttonFont" @click="filterEvent = ''">All</div>
    <div class="col-2 btn btn-outline-light rounded-pill buttonFont" @click="filterEvent = 'sporting'">Sporting</div>
    <div class="col-2 btn btn-outline-light rounded-pill buttonFont" @click="filterEvent = 'convention'">Convention</div>
    <div class="col-2 btn btn-outline-light rounded-pill buttonFont" @click="filterEvent = 'digital'">Digital</div>
    <div class="col-2 btn btn-outline-light rounded-pill buttonFont" @click="filterEvent = 'concert'">Concert</div>
  </div>

</template>

<script>
import { onMounted, ref, computed } from "vue";
import { AppState } from "../AppState";
import { eventsService } from "../services/EventsService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";


export default {


  setup() {
    const filterEvent = ref('')

    async function getEvents() {
      try {
        await eventsService.getEvents()
      } catch (error) {
        logger.error('[Getting Events]', error)
        Pop.toast(error.message, 'error')
      }
    }


    onMounted(() => {
      getEvents();
    })
    return {
      filterEvent,
      events: computed(() => AppState.events.filter(e => filterEvent.value ? e.type == filterEvent.value : true)),
    };

  }
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