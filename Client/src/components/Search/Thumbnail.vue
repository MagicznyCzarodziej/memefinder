<template>
  <div class="memeThumbnail">
    <img :src=src alt="" @click="enlarge">
    <div class="tags">
      {{ tags.join(', ') }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['src', 'tags'],
  data() {
    return {

    };
  },
  methods: {
    enlarge(event) {
      // event.target.classList.toggle('large');
      const win = window.open(event.target.src, '_blank');
      win.focus();
    },
  }
}
</script>

<style>
.memeThumbnail {
  margin-bottom: 1rem;    
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
  width: 1%;
  display: table;
  position: relative;
}
.memeThumbnail img {
  display: block;
  max-width: 10rem;
  min-width: 10rem;
  box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.1), 0rem 0rem 0.1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.4rem;
  cursor: pointer;
  transition: 0.5s;
}
.large {
  max-width: 20rem !important;
  width: 20rem !important;
}
.memeThumbnail > img:hover + .tags {
  visibility : visible;
  transition-delay: 0.5s;
}
.tags {
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  visibility: hidden;
  bottom: 0;
  background-color: #fff;
  font-size: 0.7rem;
  color: #aaa;
  text-align: center;
  padding: 0.4rem;
  border-bottom-left-radius: 0.35rem;
  border-bottom-right-radius: 0.35rem;
  box-shadow: 0 -0.1rem 0.1rem rgba(0, 0, 0, 0.1);
}
.tags:hover {
  visibility: visible;
}
</style>
