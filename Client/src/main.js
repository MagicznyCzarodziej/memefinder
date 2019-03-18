import Vue from 'vue';
import App from '@/components/Search/App.vue';
import AddMemes from '@/components/AddMemes/AddMemes.vue';
import EditMeme from '@/components/EditMeme/EditMeme.vue';

const routes = {
  '/': App,
  '/AddMemes': AddMemes,
  '/EditMeme': EditMeme,
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
