<template>
    <div id="editMeme">
        <img :src=memeSrc>
        <div class="inputField"><label for="memeName">Nazwa</label><input type="text" name="memeName" id="inpName" v-model="name"></div>
        <div class="inputField"><label for="memeTags">Tagi</label><textarea name="memeTags" id="inpTags" cols="30" rows="10" v-model="tags" ></textarea></div>
        <div class="inputField" v-if="!saving"><input type="submit" id="inpSubmit" value="Zapisz" @click.prevent="save"></div>
        <div class="inputField"><input type="submit" id="inpRemove" value="Usuń" @click.prevent="remove"></div>
        </div>
</template>

<script>
import Api from '@/services/Api';

export default {
    data() {
        return {
            memeId: '',
            memeSrc: '',
            name: '',
            tags: '',
            saving: false,
        };
    },
    methods: {
        save: async function() {
            this.saving = true;
            const meme = {
              id: this.memeId,
              name: this.name.toLowerCase(),
              tags: this.tags.toLowerCase().split('\n'),
            }
            const response = await Api.updateMeme(meme);
            this.saving = false;
        },
        remove: async function () {
          const response = await Api.removeMeme(this.name);
          window.location.pathname = '/';
          window.location.search = '';
        }
    },
    created: async function() {
        const urlParams = new URLSearchParams(window.location.search);
        this.memeId = urlParams.get("id");

        const response = await Api.getById(this.memeId);
        this.memeSrc = response.data.data.link;
        this.name = response.data.data.name;
        this.tags = response.data.data.tags.join('\n');
    },
}
</script>

<style scoped>
  html {
    font-size: 20px;
    font-family: Roboto, sans-serif;
    background-color: #f9f9f9;
  }
  body {
    margin: 0;
  }
  #editMeme {
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
  #inpSubmit, #inpRemove {
    width: 20rem;
    height: 2rem;
    font-size: 1rem;
    border-radius: 0.3rem;
    color: #fff;
  }
   #inpSubmit {
    background-color: #15c43a;
  }
  #inpRemove {
    background-color: #c42b2b;
  }
</style>
