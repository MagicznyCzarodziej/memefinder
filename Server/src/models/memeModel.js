import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const memeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    link: {
        type: String,
        required: true
    }
}, {
    versionKey: false 
});

const MemeModel = mongoose.model('meme', memeSchema);

MemeModel.getAll = () => MemeModel.find({});
MemeModel.addMeme = (meme) => meme.save();
MemeModel.deleteMeme = (memeName) => MemeModel.deleteOne({ name: memeName });

export default MemeModel;