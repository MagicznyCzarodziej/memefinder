import dotenv from 'dotenv';

const envFound = dotenv.config();
if (!envFound) {
  throw new Error('Couldn\'t find .env file');
}

export default {
  mongodb: {
    URL: process.env.MONGODB_URL,
  },
  auth: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
};
