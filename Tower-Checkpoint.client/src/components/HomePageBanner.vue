<template>

  <div class="container-fluid bannerBackground ">
    <div class="row">
      <div class="col-12">
        <div class=" bannerFont m-5">
          <p class="">Get ahead of the scalpers.</p>
          <p>Reserve your seat now with</p>
          <p>real events for real people.</p>
        </div>
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
 .bannerBackground {
   background-image: url(https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80);
   background-position: center;
   background-size: cover;
   border: 2px rgb(69, 89, 126) solid;
   height: 400px;
 }

 .bannerFont {
   font-size: 2em;
   font-family: MontereyFLF;
   color: antiquewhite;
   text-shadow: 0 0 5px white, 0 0 10px rgb(0, 0, 0);
 }
</style>