import mongoose from 'mongoose';
import Meme from '../models/memeModel.js';

mongoose.set('useFindAndModify', false);

export default class MemeController {
  async getAll(req, res) {
    try {
      const memes = await Meme.getAll();
      res.send({ data: memes });
    } catch(error) {
      res.status(500).send({
        data: {
          error: {
            code: 'SERVER_ERROR',
            message: 'Something went wrong',
          },
        },
      });
    }
  }

  async getById(req, res) {
    const id = req.params.id;
    try {
      const meme = await Meme.getById(id);
      res.send({ data: meme });
    } catch(error) {
      res.status(500).send({
        data: {
          error: {
            code: 'SERVER_ERROR',
            message: 'Something went wrong',
          },
        },
      });
    }
  };

  async add(req, res) {
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
      res.send({ data: savedMeme });
    } catch(error) {
      res.status(500).send({
        data: {
          error: {
            code: 'SERVER_ERROR',
            message: 'Something went wrong',
          },
        },
      });
    }
  };

  async delete(req, res) {
    const name = req.body.name;

    try {
      const deletedMeme = await Meme.deleteMeme(name);
      const deletedCount = deletedMeme.deletedCount;
      res.send({ data: { name, deletedCount } });
    } catch(error) {
      res.status(500).send({
        data: {
          error: {
            code: 'SERVER_ERROR',
            message: 'Something went wrong',
          },
        },
      });
    }
  };

  async update(req, res) {
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
      res.send({ data: updatedMeme });
    } catch(error) {
      console.log(`Error in updating meme: ${error}`);
      res.status(500).send({
        data: {
          error: {
            code: 'SERVER_ERROR',
            message: 'Something went wrong',
          },
        },
      });
    }
  };
}
