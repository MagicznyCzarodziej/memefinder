<template>
  <div id="app">
    <div id="header">
      <div id="title">Memedex
        <Quote/>
      </div>
      <div id="searchBar">
        <form onsubmit="document.getElementById('searchInput').blur();return false;" autocomplete="off">
          <input type="search" id="searchInput" name="searchBar" placeholder="np. kermit, pikachu, pepe" autofocus v-model="query">
        </form>
      </div>
    </div>
    <div id="controlBar">
      <div id="sort">
        <div id="sortRandom" class="sortButton" v-bind:class="sort == 'random' ? 'sortActive' : ''" @click="sort='random'">Losowo</div>
        <div id="sortNew" class="sortButton" v-bind:class="sort == 'new' ? 'sortActive' : ''" @click="sort='new'">Najnowsze</div>
      </div>
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
      <Thumbnail v-for="meme in foundMemes" :key="meme._id" :meme="meme" :data-id="meme._id"></Thumbnail>
    </div>
  </div>
</template>

<script>
import Macy from 'macy';
import Thumbnail from '@/pages/Home/Thumbnail';
import Quote from '@/components/Quote';
import Api from '@/services/Api';

document.title = 'Memedex';

let timer = 0;

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default {
  name: 'Home',
  components: {
    Thumbnail,
    Quote,
  },
  data () {
    return {
      query: '',
      allMemes: [],
      foundMemes: [],
      howMany: 30,
      sort: 'random',
    };
  },
  created: async function () {    

    const response = await Api.getAll();
    this.allMemes = response.data.data;
    this.query = decodeURIComponent(window.location.search.substring(1));
    if (this.query) return;
    if (this.sort == 'random') this.foundMemes = shuffle(this.allMemes.slice()).slice(-this.howMany);
    else this.foundMemes = this.allMemes.slice(-this.howMany).reverse();
  },
  mounted: function () {
    window.addEventListener('scroll', () => {
      if (document.querySelector('#app').clientHeight == pageYOffset + innerHeight && this.howMany < this.allMemes.length) {
        this.howMany += 10;
        this.displayMemes();
      }
    });
  },
  updated: function () {
    const macyInstance = Macy({
      container: '#foundList',
      columns: 2,
      mobileFirst: true,
      margin: {
        x: 20,
        y: 20,
      },
      breakAt: {
        1000: 3,
        1140: 4,
        1400: 5,
        1660: 6,
        1920: 7,
      }
    });
  },
  watch: {
    query: function (newQuery, oldQuery) {
      // Debouncer
      this.searching = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.displayMemes(newQuery, oldQuery);
        this.searching = false;
      }, 400);
    },
    sort: function () {
      this.displayMemes();
    }
  },
  computed: {
    foundCount: {
      get: function () {
        return this.foundMemes.length;
      },
    }
  },
  methods: {
    displayMemes(newQuery = this.query, oldQuery = '') {
      if (newQuery.length < 2) {
        if (this.sort == 'random') this.foundMemes = shuffle(this.allMemes.slice()).slice(-this.howMany);
        else this.foundMemes = this.allMemes.slice(-this.howMany).reverse();
        return;
      }
      newQuery = newQuery.toLowerCase();
      newQuery = newQuery.replace(/[^,\sąęłńóśźż\w]/g, "");
      let parts = newQuery.match(/[\w\sąęłńóśźż]+/g);

      this.foundMemes = this.allMemes.filter((meme) => {
        let flag = false;
        const tags = meme.tags.join(',');
        
        parts.forEach(q => {
          const index = tags.search(q);
          flag = index !== -1;
        });

        return flag;
      });
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
  margin: 0;
}
body {
  margin: 0;
}
</style>

<style scoped>
#app {
  padding-bottom: 2rem;
}
#header {
  background-color: #343F74;
  color: #eee;
  padding: 1rem 2rem;
}
#title {
  font-size: 4rem;
}
#searchBar {
  margin: 1rem 0;
}
#searchBar input {
  width: 100%;
  height: 6rem;
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
#controlBar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 2rem 2rem;
  text-align: center;
}
#sort {
  font-size: 3rem;
}
.sortButton{
  width: 50%;
  box-sizing: border-box;
  background-color: #ddd;
  padding: 0.6rem 1rem;
  cursor: pointer;
  box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.1), 0rem 0rem 0.1rem rgba(0, 0, 0, 0.1);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none; 
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
#sortRandom {
  display: inline-block;
  border-top-left-radius: 0.6rem;
  border-bottom-left-radius: 0.6rem;
}
#sortNew {
  display: inline-block;
  border-top-right-radius: 0.6rem;
  border-bottom-right-radius: 0.6rem;
}
.sortActive {
  background: #343F74;
  color: #eee;
}
#foundLabel {
  display: none;
}
#foundList {
  margin: 0 2rem;
}

@media (min-width: 1000px) {
  #title {
    font-size: 3rem;
  }
  #searchBar input {
    height: 2.5rem;
    padding: 0 1rem;
    font-size: 1.2rem;
    border-radius: 0.4rem;
  }
  #controlBar {
    flex-direction: row;
    margin: 1rem 2rem;
  }
  #sort {
    font-size: 1rem;
    margin: 0;
  }
  .sortButton{
    width: initial;
    float: left;
    padding: 0.3rem 0.6rem;
  }
  #sortRandom {
    display: inline;
    border-top-left-radius: 0.3rem;
    border-bottom-left-radius: 0.3rem;
  }
  #sortNew {
    display: inline;
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }
  #foundLabel {
    display: block;
    color: #aaa;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1.8rem;
    float: right;
  }
}
</style>
