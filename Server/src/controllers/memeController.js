import mongoose from 'mongoose';
import Meme from '../models/memeModel.js';

const controller = {};

controller.getAll = async (req, res) => {
    try {
        const memes = await Meme.getAll();
        res.send({ status: 'success', data: memes });
    } catch(error) {
        console.log(`Error in getting memes: ${error}`);
        res.send({ status: 'error', data: null });
    }
}
controller.add = async (req, res) => {
    const data = req.body;
    const meme = Meme({
        name: data.name,
        type: data.type,
        tags: data.tags,
        link: data.link
    });
    try {
        const savedMeme = await Meme.addMeme(meme);
        console.log('Adding meme...');
        res.send({ status: 'success', data: savedMeme });
    } catch(error) {
        console.log(`Error in adding meme: ${error}`);
        res.send({ status: 'error', data: null });
    }
}
controller.delete = async (req, res) => {
    const name = req.body.name;
    console.log(name);
    
    try {
        const deletedMeme = await Meme.deleteMeme(name);
        const deletedCount = deletedMeme.deletedCount;
        
        console.log(`Removing meme "${name}"`);
        res.send({ status: 'success', data: { name, deletedCount } });
    } catch(error) {
        console.log(`Error in removing meme: ${error}`);
        res.send({ status: 'error', data: null });
    }
}
export default controller;