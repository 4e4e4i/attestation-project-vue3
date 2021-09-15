<template>
  <div class="app-layout">
    <section class="app-layout__videos action-layout">
      <video
        class="action-layout__video"
        v-for="(video, index) in videos"
        :key="index"
        :src="video"
        autoplay
        loop
        muted
      />
    </section>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import '@/assets/scss/app.scss'

import filaVideo from '@/assets/video/fila.webm'
import urbanVideo from '@/assets/video/urbanvibes.mp4'
import columbiaVideo from '@/assets/video/columbia-video.webm'
import demixVideo from '@/assets/video/demix.mp4'

export default defineComponent({
  name: 'app',

  data () {
    return {
      videos: [
        filaVideo,
        urbanVideo,
        columbiaVideo,
        demixVideo
      ]
    }
  }
})
</script>

<style lang="scss">

.app-layout {
  min-height: 100%;
}

.action-layout {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  z-index: -1;

  &__video {
    width: 50%;
    height: calc(100vh / 2);
    object-fit: cover;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }
}

</style>
