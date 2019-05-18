<template>
  <div id="app">
    <div id="searchBar">
      <form onsubmit="document.getElementById('searchInput').blur();return false;" autocomplete="off"><input type="search" id="searchInput" name="searchBar" placeholder="np. kermit, pikachu, pepe" autofocus v-model="query"></form>
      <div v-if="query.length > 1" id="foundLabel">
        <span v-if="searching">Szukanie (・へ・)</span>
        <span v-else-if="foundCount === 0">Nie znaleziono żadnego memika ( ͡° ʖ̯ ͡°)ﾉ⌐■-■ </span>
        <span v-else-if="foundCount === 1">Znaleziono 1 memik ヽ( ͝° ͜ʖ͡°)ﾉ</span>
        <span v-else-if="[2,3,4].includes(foundCount % 10) && !([12,13,14].includes(foundCount))">Znaleziono {{ foundCount }} memiki ( ͡° ͜ʖ ͡° )つ──☆*:・ﾟ</span>
        <span v-else>Znaleziono {{ foundCount }} memików ( ͡° ͜ʖ ͡° )つ──☆*:・ﾟ</span>
      </div>
      <div v-else id="foundLabel">
        <span>Mamy w bazie {{ allMemes.length }} 
          <span v-if="allMemes.length % 10 >= 2 && allMemes.length % 10 <= 4">memiki</span>
          <span v-else>memików</span> 
           ( ͡€ ͜ʖ ͡€)
        </span>
      </div>
    </div>
    
    <div id="foundList">
      <Thumbnail v-for="(meme, index) in foundMemes" :key="index" :meme="meme" :src="meme.src" :data-id="meme._id"></Thumbnail>
    </div>
    <div id="tagsCloud">
      <a href="?co">co</a> 
      <a href="?śmiech">śmiech</a> 
      <a href="?meksykanin">meksykanin</a> 
      <a href="?gwiezdne wojny">gwiezdne wojny</a>
      <a href="?komputer">komputer</a>
      <a href="?głowa">głowa</a>
      <a href="?kot">kot</a>
    </div>
  </div>
</template>

<script>
import Thumbnail from '@/components/Search/Thumbnail';
import Api from '@/services/Api';

document.title = 'MemeFinder';

let timer = 0;

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

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
    shuffle(this.allMemes)
    const length = this.allMemes.length;
    this.query = decodeURIComponent(window.location.search.substring(1));
    if (!this.query) this.foundMemes = this.allMemes.slice(0, 20);
  
    self = this;
  },
  watch: {
    query: (newQuery, oldQuery) => {
      function displayMemes() {
        if (newQuery.length < 2) {
          self.foundMemes = self.allMemes.slice(0, 20);
          return;
        }
        newQuery = newQuery.toLowerCase();
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

      // Debouncer
      self.searching = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        displayMemes();
        self.searching = false;
      }, 400);
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
  background: url('../../assets/bg.png');
}
body {
  margin: 0;
}
#app {
  margin: 3rem 3rem;
}
#searchBar {
  margin-left: auto;
  margin-right: auto;
}
#searchBar input {
  width: 100%;
  height: 8rem;
  box-sizing: border-box;
  padding: 0 3rem;
  background-color: #fff;
  font-size: 3rem;
  font-family: Roboto;
  border-radius: 1rem;
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
  font-size: 2rem;
  font-weight: 300;
  line-height: 5rem;
}
#foundList {
  columns: 2;
}
#tagsCloud {
  margin-top: 2rem;
  text-align: center;
}
#tagsCloud a {
  font-size: 4rem;
  margin: 1rem 0;
  color: #aaa;
  text-decoration: none;
  background-color: #eee;
  border-radius: 1rem;
  padding: 0.3rem 1rem;
  display: block;
}
#tagsCloud a:hover {
  background-color: #ddd;
}

@media (min-width: 1000px) {
  #app {
    margin: 2rem 6rem;
  }
  #searchBar {
    width: 40rem;
  }
  #searchBar input {
    height: 3rem;
    padding: 0 1rem;
    font-size: 1.2rem;
    border-radius: 0.4rem;
  }
  #foundLabel {
    font-size: 0.8rem;
    line-height: 2rem;
  }
  #foundList {
    column-count: initial;
    -webkit-column-width: 12rem;
    -moz-column-width: 12rem;
    column-width: 12rem;
  }
  #tagsCloud {
    margin-top: 1rem;
  }
  #tagsCloud a {
    display: inline;
    font-size: 1rem;
    margin: 0;
    padding: 0.1rem 0.3rem;
    border-radius: 0.3rem;
  }
}
</style>
