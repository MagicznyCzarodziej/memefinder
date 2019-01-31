<template>
  <div id="app">
    <div id="searchBar">
      <input type="text" name="searchBar" placeholder="np. kermit, deszcz, smutek" v-model="query">
      <div id="foundLabel">
        <span v-if="foundCount > 4">Znaleziono {{ foundCount }} memików ( ͡€ ͜ʖ ͡€)</span>
        <span v-else-if="foundCount > 1">Znaleziono {{ foundCount }} memiki ( ͡€ ͜ʖ ͡€)</span>
        <span v-else-if="foundCount === 1">Znaleziono 1 memik ヽ( ͝° ͜ʖ͡°)ﾉ</span>
        <span v-else>Nie znaleziono żadnego memika ( ͡° ʖ̯ ͡°)ﾉ⌐■-■ </span>
      </div>
    </div>
    
    <div id="foundList">
      <Thumbnail v-for="(meme, index) in foundMemes" :key="index" :src="meme.link" :tags="meme.tags"></Thumbnail>
    </div>
  </div>
</template>

<script>
import Thumbnail from '@/components/Search/Thumbnail';
import Api from '@/services/Api';
let self;
export default {
  name: 'app',
  components: {
    Thumbnail,
  },
  data () {
    return {
      query: '',
      allMemes: [],
      foundMemes: [],
    };
  },
  created: async function () {
    const response = await Api.getAll();
    this.allMemes = response.data.data;
    this.foundMemes = this.allMemes.slice(0, 10);
    self = this;
  },
  watch: {
    query: (newQuery, oldQuery) => {
      if (newQuery.length < 2) {
        self.foundMemes = [];
        return;
      }
      newQuery = newQuery.replace(/[^,\sąęłńóśźż\w]/g, "");
      let parts = newQuery.match(/[\w\sąęłńóśźż]+/g);

      self.foundMemes = self.allMemes.filter((meme) => {
        let flag = false;
        const tags = meme.tags.join(',');
        
        parts.forEach(q => {
          const index = tags.search(q);
          flag = index !== -1;
        });

        return flag;
      });
    }
  },
  computed: {
    foundCount: {
      get: function () {
        return this.foundMemes.length;
      },
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
  }
  #searchBar input {
    width: 100%;
    height: 3rem;
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
    margin: 0.5rem 0 0.5rem 0.5rem;
    color: #aaa;
    font-size: 0.8rem;
    font-weight: 300;
    line-height: 2rem;
  }
  #foundList {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
