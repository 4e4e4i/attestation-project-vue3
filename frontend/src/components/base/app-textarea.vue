<template>
  <textarea
    ref="app-textarea"
    v-model="model"
    rows="1"
    class="app-textarea"
    :name="textareaLabel"
    @input="emitInput"
    @change="emitChange"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    textareaValue: {
      type: String,
      required: true
    },

    textareaLabel: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      model: this.textareaValue
    }
  },

  methods: {
    changeTextareaHeight () {
      const textarea = this.$refs['app-textarea'] as HTMLElement
      const oneLineHeight = 40
      textarea.style.minHeight = ''
      if (textarea.scrollHeight > oneLineHeight) {
        textarea.style.minHeight = `${textarea.scrollHeight}px`
      }
    },

    emitInput () {
      this.changeTextareaHeight()
      this.$emit('input-value', this.model)
    },

    emitChange () {
      this.$emit('change-value', this.model)
    }
  },

  mounted () {
    this.changeTextareaHeight()
  },

  watch: {
    textareaValue (newVal) {
      this.model = newVal
    }
  }
})
</script>

<style lang="scss">
.app-textarea {
  height: 100%;
  color: inherit;
  font-size: 14px;
  font-family: inherit;
  line-height: 20px;
  background-color: transparent;
  border: none;
  border-radius: 0;
  outline: none;
  appearance: none;
  resize: none;
}
</style>
