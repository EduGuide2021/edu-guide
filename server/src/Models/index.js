import mongoose from 'mongoose';

import User from './user.js';
import Message from './message.js';
import Community from './community.js';
import Blog from './blog.js'
import SpecialTest from './specialtest.js'

const dbUrl = 'mongodb+srv://rptramirez:Web2015107155@cluster0.igro8.mongodb.net/test'

const connectDb = () => {
  if (dbUrl) {
    return mongoose.connect(
      dbUrl,
      { useNewUrlParser: true },
    );
  }

  if (dbUrl) {
    return mongoose.connect(
      dbUrl,
      { useNewUrlParser: true },
    );
  }
};

const models = { User, Message, Community, Blog, SpecialTest };

export { connectDb };

export default models;
