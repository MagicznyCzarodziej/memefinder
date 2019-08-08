<template>
  <span class="quote">{{ quote }}</span>
</template>

<script>
export default {
  data() {
    return {
      quotes: [
        '"Nie znam twoich memików, sprawdzę Memedex" - Taco Memingway',
        '"Potrzeba wiecej memików, sir" - Skryba',
        '"It\'s time to post memes and chew bubblegum... and I\'m all outta gum."',
        '"Życie jest jak pudełko memików. Nigdy nie wiesz, co ci się trafi" - Forrest Gump',
        '"Memików nie ma, ale też jest zajebiście" - Laska',
        '"Memes. Memes never changes."',
        '"Przed wyruszeniem w drogę należy zebrać memiki."',
        '"Hmmm" - Minecraft Villager',
      ],
      quote: '',
    };
  },
  created: function () {
    this.quote = this.quotes[Math.floor(Math.random()*(this.quotes.length))];
  },
}
</script>

<style scoped>
.quote {
  display: block;
  font-size: 2rem;
  font-weight: 300;
  font-style: italic;
}
@media (min-width: 1000px) {
  .quote {
    font-size: 1rem;
  }
}
</style>
