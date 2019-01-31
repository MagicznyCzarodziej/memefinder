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
            event.target.classList.toggle('large');
            
        },
    }
}
</script>

<style>
  .memeThumbnail {
    margin: 0.2rem;    
    width: 1%;
    display: table;
    position: relative;
  }
  .memeThumbnail img {
    display: block;
    max-height: 10rem;
    box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.1), 0rem 0rem 0.1rem rgba(0, 0, 0, 0.1);
    border-radius: 0.4rem;
    cursor: pointer;
    transition: 0.5s;
  }
  .large {
      max-height: 20rem !important;
  }
   .memeThumbnail img:hover ~ .tags {
       opacity: 1 !important;
   }
  .tags {
    width: 100%;
    box-sizing: border-box;
    opacity: 0;
    position: absolute;
    bottom: 0;
    background-color: #fff;
    font-size: 0.7rem;
    color: #aaa;
    text-align: center;
    padding: 0.4rem;
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
    transition: opacity 0.3s;
  }
  .tags:hover {
      opacity: 1;
  }
</style>
