const mongoose = require('mongoose');


const dbConnection = async () => {
  try {
    const mongoDB = process.env.MONGO_URI;
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      /*Deprecation findOneAndUpdate*/
      useFindAndModify: false,
    });
    console.log('MongoDB database connection established successfully');
  } catch (error) {
    console.log(error);
    throw new Error('Error connection DB');
  }
};
module.exports = {
  dbConnection,
};
