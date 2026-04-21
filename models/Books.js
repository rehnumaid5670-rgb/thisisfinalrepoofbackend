const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({

  title:{
    type:String,
    required:true
  },

  author:{
    type:String
  },

  category:{
    type:String
  },

  image:{
    type:String
  },

  available:{
    type:Boolean,
    default:true
  },

  
  quantity: { type: Number, required: true }
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;


