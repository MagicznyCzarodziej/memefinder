<template>
  <div id="app">
    <div id="searchBar">
      <input type="text" name="searchBar" placeholder="np. kermit, deszcz, smutek" v-model="query">
    </div>
    <div id="foundLabel">
      <span v-if="foundCount > 4">Znaleziono {{ foundCount }} memików ( ͡€ ͜ʖ ͡€)</span>
      <span v-else-if="foundCount > 1">Znaleziono {{ foundCount }} memiki ( ͡€ ͜ʖ ͡€)</span>
      <span v-else-if="foundCount == 1">Znaleziono 1 memik ヽ( ͝° ͜ʖ͡°)ﾉ</span>
      <span v-else>Nie znaleziono żadnego memika ( ͡° ʖ̯ ͡°)ﾉ⌐■-■ </span>
    </div>
    <div id="foundList">
      <Item v-for="(meme, index) in allMemes" :key="index" v-bind:src="meme.link"></Item>
    </div>
  </div>
</template>

<script>
import Item from '@/Item';
import Api from '@/services/Api';

let foundCount = 0;
let allMemes;
let query = "";

export default {
  name: 'app',
  components: {
    Item,
  },
  data () {
    return {
      query,
      foundCount,
      allMemes,
    };
  },
  beforeCreate: async function () {
    const response = await Api.getAll();
    this.allMemes = response.data.data;
    this.foundCount = this.allMemes.length;
  },
  watch: {
    query: (newQuery, oldQuery) => {
      if (newQuery.length < 3) return;
      newQuery = newQuery.replace(/[^,\w]/g, "");
      const parts = newQuery.match(/\w+/g);
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400');
  html {
    font-size: 20px;
    font-family: Roboto, sans-serif;
    background-color: #f9f9f9;
  }
  body {
    margin: 0;
  }
  #app {
    margin: 0 5rem;
  }
  #searchBar {
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
    width: 40rem;
    height: 3rem;
  }
  #searchBar input {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 1rem;
    background-color: #fff;
    font-size: 1.2rem;
    font-family: Roboto;
    border-radius: 0.4rem;
    border: none;
    box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.1), 0rem 0rem 0.1rem rgba(0, 0, 0, 0.1);
  }
  #searchBar input:focus { 
    outline: none !important;

  }
  #searchBar input::placeholder {
    color: #bbb;
  }

  #foundLabel {
    margin: 0.5rem 0 0.5rem 8rem;
    color: #aaa;
    font-size: 0.8rem;

    font-weight: 300;
  }

  #foundList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .memeThumbnail {
    margin: 0.2rem;    
  }
  .memeThumbnail img {
    display: block;
    max-height: 10rem;
    box-shadow: 0rem 0rem 0.4rem rgba(0, 0, 0, 0.1);
    border-radius: 0.4rem;
    cursor: pointer;
    
  }

</style>
