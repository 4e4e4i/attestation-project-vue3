<template>
  <div class="app-loader">
    MB
    <div class="app-loader__icon"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'app-loader'
})
</script>

<style lang="scss">

.app-loader {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  width: 180px;
  color: $white;
  font-size: 60px;
  background-color: rgba($black, 0.2);
  border-radius: 50%;

  &__icon {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: rotate 2s linear infinite;

    &::after {
      content: "";
      position: absolute;
      top: 50px;
      right: -8px;
      width: 40px;
      height: 40px;
      background: $white;
      border-radius: 50%;
      box-shadow: 0 0 5px $white, 0 0 25px $white, 0 0 50px $white, 0 0 75px $white;
    }
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }
}

</style>
