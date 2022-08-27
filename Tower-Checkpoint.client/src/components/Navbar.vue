<template>
  <div class="navbar navbar-dark bg-white px-3 p-0 m-0 col-6-md d-flex">
    <router-link class="navbar-brand d-flex p-0" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img class="" alt="" src="../assets/img/Ely.png" height="75" />
      </div>
    </router-link>
    <div class="col-2 offset-6">
      <button type="button" class="noBorder square text-dark py-4 selectable bg-white" data-bs-toggle="modal"
        data-bs-target="#exampleModal">Create Event</button>
      <Modal id="exampleModal" class="">
        <EventForm />
      </Modal>
    </div>
    <!-- <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
    </button> -->
    <Login />
  </div>
</template>

<script>
import EventForm from "./EventForm.vue";
import Modal from "./Modal.vue";
export default {
  setup() {
    return {};
  },
  components: { EventForm, Modal }
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.noBorder{
  border: none;
}
</style>
