<template>
  <div>
    <app-header></app-header>
    <div class="container-fluid">
      <div class="row">
        <app-slider></app-slider>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import appHeader from "./components/common/app-header";
import appSlider from "./components/common/app-slider";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    "app-header": appHeader,
    "app-slider": appSlider
  }
};
</script>

<style>
</style>
