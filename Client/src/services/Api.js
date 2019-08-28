import axios from 'axios';
import config from '@/config';

const Api = () => axios.create({
    baseURL: config.apiUrl,
    headers: {
        Authorization: localStorage.getItem('auth_token'),
    },
});

async function getAll() {
    return await Api().get('memes');
}
async function getById(id) {
    return await Api().get('memes/' + id);
}
async function addMeme(meme) {
    return await Api().post('memes', meme);
}
async function removeMeme(name) {
    return await Api().delete('memes', { data: { name } });
}
async function updateMeme(meme) {
    return await Api().put('memes', meme);
}

export default {
    getAll,
    addMeme,
    getById,
    removeMeme,
    updateMeme,
};