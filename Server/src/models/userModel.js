import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  permissions: {
    type: [String],
    required: true,
  },
});

userSchema.methods.register = async function (data) {
  this.username = data.username;
  this.passwordHash = data.passwordHash;
  this.permissions = data.permissions;

  await this.save();

  return {
    username: this.username,
    userId: this._id,
  };
};

export default mongoose.model('User', userSchema);