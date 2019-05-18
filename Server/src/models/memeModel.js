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
    },
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
}, {
    versionKey: false 
});

const MemeModel = mongoose.model('meme', memeSchema);

MemeModel.getAll = () => MemeModel.find({});
MemeModel.getById = (id) => MemeModel.findOne({ "_id": mongoose.Types.ObjectId(id) });
MemeModel.addMeme = (meme) => meme.save();
MemeModel.deleteMeme = (memeName) => MemeModel.deleteOne({ name: memeName });
MemeModel.updateMeme = function (meme) {
    const query = {
        "_id": mongoose.Types.ObjectId(meme._id)
    }
    return MemeModel.findOneAndUpdate(query, { $set: { name: meme.name, tags: meme.tags } });  
};

export default MemeModel;