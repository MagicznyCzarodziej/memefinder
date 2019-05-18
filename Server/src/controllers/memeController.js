import mongoose from 'mongoose';
import Meme from '../models/memeModel.js';
mongoose.set('useFindAndModify', false);


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
controller.getById = async (req, res) => {
    const id = req.params.id;
    try {
        const meme = await Meme.getById(id);
        res.send({ status: 'success', data: meme });
    } catch(error) {
        console.log(`Error in getting meme: ${error}`);
        res.send({ status: 'error', data: null });
    }
};
controller.add = async (req, res) => {
    const data = req.body;
    const meme = Meme({
        name: data.name,
        type: data.type,
        tags: data.tags,
        link: data.link,
        width: data.width,
        width: data.width,
        height: data.height,
    });
    try {
        const savedMeme = await Meme.addMeme(meme);
        console.log('Adding meme...');
        res.send({ status: 'success', data: savedMeme });
    } catch(error) {
        console.log(`Error in adding meme: ${error}`);
        res.send({ status: 'error', data: null });
    }
};
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
};
controller.update = async (req, res) => {
    const data = req.body;
    
    const meme = Meme({
        _id: data.id,
        name: data.name,
        type: data.type,
        tags: data.tags,
        link: data.link,
        width: data.width,
        height: data.height,
    });
    try {
        const updatedMeme = await Meme.updateMeme(meme);
        console.log('Updating meme...');
        res.send({ status: 'success', data: updatedMeme });
    } catch(error) {
        console.log(`Error in updating meme: ${error}`);
        res.send({ status: 'error', data: null });
    }
};

export default controller;