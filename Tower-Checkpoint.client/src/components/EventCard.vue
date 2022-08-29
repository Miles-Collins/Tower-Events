<template>

  <router-link :to="{ name: 'EventDetails', params: { eventId: event.id } }">
    <div class="card selectable text-dark mx-0 mx-md-2 bg-light text-start mt-4 eventCard shadow position-relative">
      <div>
        <img class="eventPicture glass" :src=event.coverImg>
        <button class="heartPosition circle selectable"><i class="mdi mdi-heart-outline d-flex"></i></button>
        <div class="mx-3">
          <h5 class="mt-3">{{ event.name }}</h5>
          <p>{{ new Date(event.startDate).toLocaleDateString('en-US') }}</p>
          <p>{{ event.location }}</p>
          <div v-if="event.isCanceled == false || event.capacity > 0">
            <p>Tickets Left: {{ event.capacity }}</p>
          </div>
        </div>
      </div>
    </div>
  </router-link>
  <div v-if="event.isCanceled == true" class="bgRojo p-0 m-auto col-11">
    <h2 class="p-0 m-0 text-center text-dark sold rounded">CANCELLED</h2>
  </div>
  <div v-if="event.capacity == 0" class="bgRojo m-auto col-11">
    <h2 class="p-0 m-0 text-dark sold text-center">SOLD OUT</h2>
  </div>


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
  background-color: rgba(255, 0, 0, 0.658);
  border-radius: 2%;
}

.sold {
  font-family: CutOutsFLF;
}

.eventPicture {
  height: auto;
  width: 100%;
}



.heartPosition {
  position: absolute;
  right: 10px;
  top: 270px;
  border-color: rgba(0, 0, 0, 0.255);
  border-width: 1px;
}
</style>