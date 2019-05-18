import axios from 'axios';
import config from '@/config';

async function upload(image) {
    var form = new FormData();
    form.append("image", image);
    form.append("album", config.imgur.album);
    return await axios({
        method: 'post',
        url: config.imgur.url,
        headers: {
            'Authorization': `Bearer ${config.imgur.auth}`,
            'content-type': 'multipart/form-data',
        },
        data: form,
      });
}

export default {
    upload,
};