<template>
  <div id="addMemes">
    <div id="header">Dodaj memika</div>
    <div class="inputField"><input type="file" name="memeFile" id="inpFile" accept=".png,.jpg,.jpeg,.bmp,.gif" ref="file" @change="handleFileUpload()"></div>
    <div class="inputField"><label for="memeName">Nazwa</label><input type="text" name="memeName" id="inpName" v-model="name"></div>
    <div class="inputField"><label for="memeTags">Tagi</label><textarea name="memeTags" id="inpTags" cols="30" rows="10" v-model="tagsString"></textarea></div>
    <div class="inputField" v-if="!uploading"><input type="submit" id="inpSubmit" value="Dodaj" @click.prevent="addMeme"></div>
    <div v-if="uploading">Zapisywanie...</div>
  </div>
</template>

<script>
import Imgur from '@/services/Imgur';
import Api from '@/services/Api';

document.title = 'MemeFinder / Dodaj';

export default {
  name: 'AddMemes',
  data () {
    return {
      name: '',
      tagsString: '',
      file: '',
      uploading: false,
    };
  },
  methods: {
    addMeme: async function () {
      this.uploading = true;
      const response = await Imgur.upload(this.file);
      const link = response.data.data.link;
      const extension = this.file.name.split('.').pop();
      const types = {
        'png': 'image',
        'jpg': 'image',
        'jpeg': 'image',
        'bmp': 'image',
        'gif': 'gif',
        'mp4': 'webm/mp4',
        'webm': 'webm/mp4',
        'gifv': 'webm/mp4',
      }
      const type = types[extension];
      const meme = {
        name: this.name,
        tags: this.tags,
        type,
        link,
      }
      
      const res = await Api.addMeme(meme);
      this.uploading = false;
      this.reset();
    },
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
    },
    reset(){
      this.name = '';
      this.tagsString = '';
      this.file = '';
      const fileInput = this.$refs.file;
      fileInput.type = 'text';
      fileInput.type = 'file';
    },
  },
  computed: {
    tags: {
      get: function () {
        return this.tagsString.split('\n');
      }
    },
  },
}
</script>

<style>
  html {
    font-size: 20px;
    font-family: Roboto, sans-serif;
    background-color: #f9f9f9;
  }
  body {
    margin: 0;
  }
  #addMemes {
    margin-top: 2rem;
    text-align: center;
    background-color: #eee;
    width: 30rem;
    margin: 2rem auto;
    padding: 1rem 0;
    border-radius: 0.4rem;
    box-shadow: 0rem 0rem 0.1rem rgba(0, 0, 0, 0.2), 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  }
  #header {
    font-size: 2rem;
    color: #444;
  }
  #inpFile {
    height: 5rem;
    background-color: #ddd;
    border-radius: 0.3rem;
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.5);
    padding: 1rem;
    box-sizing: border-box;
    width: 20rem;
  }
  .inputField {
    margin: 1rem 0;
  }
  #inpName {
    font-size: 1.2rem;
    width: 20rem;
  }
  label {
    display: block;
    background-color: #ddd;
    width: 20rem;
    padding: 0.2rem 0;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    margin-right: auto;
    margin-left: auto;
    box-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.5);
  }
  input, textarea {
    box-sizing: border-box;
    box-shadow: 0 0rem 0.1rem rgba(0, 0, 0, 0.5);
    border: none;
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
  }
  #inpTags {
    width: 20rem;
    resize: none;
  }
  #inpSubmit {
    width: 20rem;
    height: 2rem;
    font-size: 1rem;
    border-radius: 0.3rem;
  }
</style>
