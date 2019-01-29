import axios from 'axios';
import config from '@/config';

const Api = () => axios.create({
    baseURL: config.apiUrl,
});

async function getAll() {
    return await Api().get('all');
}
async function addMeme(meme) {
    return await Api().post('add', meme);
}
async function deleteMeme(name) {
    return await Api().delete('delete', { name });
}

export default {
    getAll,
    addMeme,
    deleteMeme,
};