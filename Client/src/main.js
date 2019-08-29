import Vue from 'vue';
import Vuex from 'vuex';

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

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('auth_token'),
    username: localStorage.getItem('username'),
    permissions: localStorage.getItem('permissions'),
  },
  mutations: {
    login(state, payload) {
      localStorage.setItem('auth_token', payload.auth_token);
      localStorage.setItem('username', payload.username),
      localStorage.setItem('permissions', payload.permissions),

      state.isLoggedIn = true;
      state.username = payload.username;
      state.permissions = payload.permissions;
    },
    logout(state) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('username'),
      localStorage.removeItem('permissions'),

      state.isLoggedIn = false;
      state.username = null;
      state.permissions = null;
    },
  }
});

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  store,
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || Home;
    }
  },
  render (h) { return h(this.ViewComponent) }
})
