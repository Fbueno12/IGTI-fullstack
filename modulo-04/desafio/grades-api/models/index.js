import mongoose from 'mongoose';

import GradesModel from './gradesModel.js';

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;

export { db, GradesModel };
