import Vue from 'vue';
import Home from '@/pages/Home/Home.vue';
import AddMeme from '@/pages/AddMeme/AddMeme.vue';
import EditMeme from '@/pages/EditMeme/EditMeme.vue';

const routes = {
  '/': Home,
  '/AddMeme': AddMeme,
  '/EditMeme': EditMeme,
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || Home;
    }
  },
  render (h) { return h(this.ViewComponent) }
})
