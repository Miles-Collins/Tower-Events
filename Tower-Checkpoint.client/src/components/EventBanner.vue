<template>
<div class="container-fluid">
  <div class="row bgImage">
    <div class="col-12 glass">
    </div>
  </div>
  </div>

</template>

<script>

export default {



  setup() {

    return {};

  }
}
</script>

<style>
 .glass {
background: rgba( 255, 255, 255, 0.25 );
box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 14.5px );
-webkit-backdrop-filter: blur( 14.5px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
 }

.bgImage {
  background-image: url(https://images.unsplash.com/photo-1496024840928-4c417adf211d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80);
    background-position: center;
   background-size: cover;
   border: 2px rgb(69, 89, 126) solid;
   height: 400px;
}

</style>