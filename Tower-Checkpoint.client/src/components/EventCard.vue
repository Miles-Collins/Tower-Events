<template>

  <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
    <div class="card selectable text-light mx-0 mx-md-2 bg-dark text-start my-4 eventCard">
      <div>
      <img class="img-fluid" :src=event.coverImg>
      <div class="mx-3">
        <h5 class="mt-3">{{ event.name }}</h5>
        <p>{{ new Date(event.startDate).toLocaleDateString('en-US') }}</p>
        <p>{{ event.location }}</p>
        <p>Tickets Left: {{ event.capacity }}</p>
      </div>  
      <div v-if="event.isCanceled == true" class="bgRojo p-0 m-0">
      <h2 class="p-0 m-0 text-center text-dark sold">CANCELLED</h2>
      </div>
      <div v-if="event.capacity == 0" class="bgRojo">
      <h2 class="p-0 m-0 text-dark sold text-center">SOLD OUT</h2>
      </div>
      </div>
    </div>
  </router-link>


  <!-- <div class="event-description my-3">
      <p>{{ event.description }}</p> -->


</template>

<script>

export default {
  props: { event: { type: Object, required: true } },





  setup() {

    return {

    };

  }
}
</script>

<style>
.eventCard {
  border: 1px solid rgba(255, 255, 255, 0.45);

}

.event-description {
  height: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.bgRojo {
  background-color: rgb(246, 102, 102);
}

.sold {
  font-family: CutOutsFLF;
}

</style>