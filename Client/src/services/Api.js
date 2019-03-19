import axios from 'axios';
import config from '@/config';

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const Api = () => axios.create({
    baseURL: config[env].apiUrl,
});

async function getAll() {
    return await Api().get('all');
}
async function getById(id) {
    return await Api().get('meme/' + id);
}
async function addMeme(meme) {
    return await Api().post('add', meme);
}
async function removeMeme(name) {
    return await Api().delete('remove', { data: { name } });
}
async function updateMeme(meme) {
    return await Api().post('update', meme);
}

export default {
    getAll,
    addMeme,
    getById,
    removeMeme,
    updateMeme,
};