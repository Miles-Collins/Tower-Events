<template>

  <div class="col-6">
    <img class="img-fluid circle" :src="ticket.profile.picture" :title="ticket.profile.name">
  </div>

</template>

<script>

export default {
props: { ticket: {type: Object, required: true}},


setup() {

  return {};

  }
}
</script>

<style> 

</style>