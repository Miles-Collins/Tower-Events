<template>
  <main class="bg-dark">
    <Navbar />
    <router-view />
  </main>


</template>

<script>
import { computed } from 'vue';
import { AppState } from './AppState';

export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.right-bar {
  height: 100VH;
  width: 100px;
}

main {
  max-height: 100vh;
  overflow-y: auto;
}

body{
  width:100%;
  height:auto;
  background-color:transparent;  
}


</style>
