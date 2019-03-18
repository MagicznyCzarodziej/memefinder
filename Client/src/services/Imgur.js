import axios from 'axios';
import config from '@/config';

// const Api = () => axios.create({
//     headers: {
//         'Authorization': `Bearer ${config.auth}`,
//         'content-type': 'multipart/form-data',
//     },
//     "crossDomain": true,
//     // data: {
//     //     album: config.album,
//     // },
// });

// async function upload(image) {
//     var form = new FormData();
//     form.append("image", "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
//     return await Api().post("https://api.imgur.com/3/image", {data: form});
// }

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

async function upload(image) {
    var form = new FormData();
    form.append("image", image);
    form.append("album", config[env].imgur.album);
    return await axios({
        method: 'post',
        url: config[env].imgur.url,
        headers: {
            'Authorization': `Bearer ${config[env].imgur.auth}`,
            'content-type': 'multipart/form-data',
        },
        data: form,
      });
}

export default {
    upload,
};