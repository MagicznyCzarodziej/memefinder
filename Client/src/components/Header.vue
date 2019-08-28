<template>
  <div class="header">
    <div class="logo">Memedex</div>
    <slot/>
    <div class="user">
      <div class="loginBtn">Zaloguj</div>
    </div>
  </div>
</template>

<script>
import Quote from '@/components/Quote';

export default {
  name: 'Header',
  components: {
    Quote,
  },
  data() {
    return {
      
    };
  },
}
</script>

<style scoped>
.header {
  background-color: #343F74;
  color: #eee;
  padding: 1rem 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
}
.logo {
  font-size: 4rem;
}
.loginBtn {
  padding: 0.4rem 1.2rem;
  font-size: 2rem;
  border: 2px solid #eee;
  border-radius: 0.4rem;
  text-align: center;
  cursor: pointer;
}

@media (min-width: 1000px) {
  .header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    font-size: 2.5rem;
  }
  .loginBtn {
    font-size: 1.2rem;
  }
}
</style>