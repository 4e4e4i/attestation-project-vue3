<template>
  <section class="main-page">
    <gate class="main-page__gate"/>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Gate from '@/components/project/gate.vue'

export default defineComponent({
  name: 'MainPage',

  components: {
    Gate
  }
})
</script>

<style lang="scss">
.main-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: auto;

  &__gate {
  }
}
</style>
