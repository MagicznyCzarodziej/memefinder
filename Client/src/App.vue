<template>
  <div id="app">
    <div id="searchBar">
      <input type="text" name="searchBar" placeholder="np. kermit, deszcz, smutek">
    </div>
    <div id="foundLabel">
      <!-- Znaleziono 1 memik ヽ( ͝° ͜ʖ͡°)ﾉ -->
      <!-- Nie znaleziono żadnego memika ( ͡° ʖ̯ ͡°)ﾉ⌐■-■  -->
      Znaleziono 7 memików ( ͡€ ͜ʖ ͡€)
    </div>
    <div id="foundList">
      <!-- <div class="memeThumbnail">
        <img src="" alt="">
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      
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
