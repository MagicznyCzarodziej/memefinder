<template>
  <div id="addMemes">
    Na razie tylko obrazki i gify
    <div class="inputField"><input type="file" name="memeFile" id="inpFile" accept=".png,.jpg,.jpeg,.bmp,.gif,.mp4,.webm,.gifv" ref="file" @change="handleFileUpload()"></div>
    <div class="inputField"><label for="memeName">Nazwa: </label><input type="text" name="memeName" id="inpName" v-model="name"></div>
    <div class="inputField"><label for="memeTags">Tagi: </label><textarea name="memeTags" id="inpTags" cols="30" rows="10" v-model="tagsString"></textarea></div>
    <div class="inputField" v-if="!uploading"><input type="submit" value="Dodaj" @click.prevent="addMeme"></div>
    <div v-if="uploading">Zapisywanie...</div>
  </div>
</template>

<script>
import Imgur from '@/services/Imgur';
import Api from '@/services/Api';

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
    text-align: center;
  }
  .inputField {
    margin: 0.5rem 0;
  }
</style>
