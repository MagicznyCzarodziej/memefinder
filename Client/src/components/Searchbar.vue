<template>
  <div id="searchBar">
    <form onsubmit="document.getElementById('searchInput').blur();return false;" autocomplete="off">
      <input type="search" id="searchInput" name="searchBar" placeholder="np. kermit, pikachu, pepe" autofocus @input="$emit('query', $event.target.value);">
      <div class="searchIcon"><img src="@/assets/search.svg" /></div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Searchbar',
}
</script>

<style scoped>
#searchBar {
  margin: 2rem 0;
  flex: 1;
}
#searchBar form {
  display: flex;
}
#searchBar input {
  width: 100%;
  height: 6rem;
  box-sizing: border-box;
  padding: 0 3rem;
  background-color: #252d52;
  color: #eee;
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
.searchIcon {
  display: none;
}

@media (min-width: 1000px) {
  #searchBar {
    margin: 0 4rem;
    max-width: 40rem;
    position: relative;
  }
  #searchBar input {
    flex: 1;
    height: 2.5rem;
    padding: 0 1rem;
    font-size: 1.2rem;
    border-top-left-radius: 0.4rem;
    border-bottom-left-radius: 0.4rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .searchIcon {
    display: block;
    background-color: #252d52;
    padding: 0.5rem 1rem;
    border-top-right-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
  }
  .searchIcon img {
    height: 100%;
    opacity: 0.8;
  }
}
</style>