import Vue from 'vue';
import App from '@/components/Search/App.vue';
import AddMemes from '@/components/AddMemes/AddMemes.vue';

const routes = {
  '/': App,
  '/AddMemes': AddMemes,
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || App;
    }
  },
  render (h) { return h(this.ViewComponent) }
})
