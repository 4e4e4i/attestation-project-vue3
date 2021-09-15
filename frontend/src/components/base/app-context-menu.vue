<template>
  <div
    v-show="isCtxVisible"
    class="app-context-menu"
    :class="componentModifier"
    :style="ctxStyle"
    v-on-click-away="onClickAway"
  >
    <div class="app-context-menu__context">
      <ul
        role="menu"
        class="app-context-menu__list"
      >
        <slot/>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { directive as onClickAway } from 'vue3-click-away'

type CtxStyle = {
  [k: string]: string
}

type ComponentModifier = {
  [k: string]: boolean
}

export default defineComponent({
  name: 'app-context-menu',

  directives: {
    onClickAway
  },

  props: {
    elementId: {
      type: String,
      require: true
    }
  },

  data () {
    return {
      align: 'left',
      ctxTop: 0,
      ctxLeft: 0,
      isCtxVisible: false,
      ctx: null
    }
  },

  computed: {
    ctxStyle (): CtxStyle {
      return {
        top: `${(this.ctxTop || 0)}px`,
        left: `${(this.ctxLeft || 0)}px`
      }
    },

    componentModifier (): ComponentModifier {
      return {
        'app-context-menu--left': this.align === 'left',
        'app-context-menu--right': this.align === 'right'
      }
    }
  },

  methods: {
    open (event: MouseEvent) {
      if (event) {
        this.setPositionFromEvent(event)
      }
      this.$emit('ctx-open')
      this.$el.setAttribute('tab-index', -1)
      this.isCtxVisible = true
      return this
    },

    close () {
      this.isCtxVisible = false
    },

    setPositionFromEvent (event: MouseEvent) {
      const scrollingElement = document.scrollingElement || document.documentElement

      if (event.pageX || event.pageY) {
        this.ctxLeft = event.pageX
        this.ctxTop = event.pageY - scrollingElement.scrollTop
      } else if (event.clientX || event.clientY) {
        this.ctxLeft = event.clientX + scrollingElement.scrollLeft
        this.ctxTop = event.clientY + scrollingElement.scrollTop
      }

      this.$nextTick(() => {
        const menu = this.$el
        const minHeight = (menu.style.minHeight || menu.style.height).replace('px', '') || 32
        const minWidth = (menu.style.minWidth || menu.style.width).replace('px', '') || 32
        const scrollHeight = menu.scrollHeight || minHeight
        const scrollWidth = menu.scrollWidth || minWidth

        const largestHeight = window.innerHeight - scrollHeight - 25
        const largestWidth = window.innerWidth - scrollWidth - 25

        if (this.ctxTop > largestHeight) this.ctxTop = largestHeight
        if (this.ctxLeft > largestWidth) this.ctxLeft = largestWidth
      })
      return event
    },

    onClickAway () {
      this.close()
    }
  }
})
</script>

<style lang="scss">
.app-context-menu {
  position: fixed;
  padding: 0;
  background-color: whitesmoke;
  z-index: 99999;
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);

  &__context {
    position: relative;
  }

  &__list {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    float: left;
    min-width: 160px;
    padding: 0;
    margin: 2px 0 0;
    font-size: .9rem;
    color: $white;
    text-align: left;
    list-style: none;
    background-color: rgba($black, .8);
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border-radius: .25rem;
    box-shadow: 0 0 5px $white, 0 0 10px $white, 0 0 15px $white, 0 0 20px $white;
  }

  &--left {
    .app-context-menu__list {
      right: auto;
      left: 0;
    }
  }

  &--right {
    .app-context-menu__list {
      right: 0;
      left: auto;
    }
  }
}
</style>
