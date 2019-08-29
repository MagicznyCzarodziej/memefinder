<template>
  <div id="login">
    <Header/>
    <form class="login__form" @submit.prevent="login">
      <div class="login__header">
        Logowanie
      </div>
      <input class="login__username"
        type="text"
        name="username"
        placeholder="Nazwa użytkownika"
        v-model="username"
      >
      <input class="login__password"
        type="password"
        name="password"
        placeholder="Hasło"
        v-model="password"
      >
      <button class="login__submit" type="submit">Zaloguj</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Api from '@/services/Api';

export default {
  name: 'Login',
  components: {
    Header
  },
  data() {
    return {
      username: null,
      password: null,
      error: null,
    };
  },
  methods: {
    async login() {
      if (!this.username || !this.password) {
        this.error = 'Wprowadź nazwę użytkownika i hasło!';
        return;
      }

      try {
        const result = await Api.login({ username: this.username, password: this.password });
        const data = result.data.data;
        console.log(data);
        this.$store.commit('login', {
          auth_token: data.token,
          username: data.username,
          permissions: data.permissions
        });
        window.location = '/';
      } catch (error) {
        if (error.response.status === 401) 
          this.error = 'Nieprawidłowa nazwa użytkownika lub hasło!';
        else {
          this.error = 'Niespodziewany błąd!';
          console.log(error);
        }
      }
    }
  }
}
</script>

<style scoped>
.login__form {
  display: flex;
  flex-direction: column;
  width: 20rem;
  padding: 1.5rem 2rem 2rem 2rem;
  margin: 4rem auto 1rem;
  border-radius: 0.4rem;
  background-color: #343F74;
}
.login__header {
  font-size: 3rem;
  text-align: center;
  color: #eee;
  margin-bottom: 1rem;
}
.login__form input, button {
  font-size: 1.2rem;
  background-color: #252d52;
  border: none;
  color: #eee;
  border-radius: 0.4rem;
  padding: 0.5rem 0.7rem;
  margin: 0.5rem;
}
.login__submit {
  background: none;
  border: 2px solid #eee;
  cursor: pointer;
}
.login__submit:hover {
  background-color: #eee;
  color: #000;
}
.error {
  text-align: center;
  margin-top: 1rem;
  color: #e62727;
}
</style>
