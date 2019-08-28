import Vue from 'vue';
import Home from '@/pages/Home';
import AddMeme from '@/pages/AddMeme';
import EditMeme from '@/pages/EditMeme';
import Login from '@/pages/Login';

const routes = {
  '/': Home,
  '/addMeme': AddMeme,
  '/editMeme': EditMeme,
  '/login': Login,
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
