import { reactive } from 'vue'

const state = reactive({
  isVisible: false
})

const spinner = {
  show() {
    state.isVisible = true
  },
  hide() {
    state.isVisible = false
  },
  get state() {
    return state
  }
}

export default spinner
