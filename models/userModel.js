const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
   likedMovies: { type: [String], default: [] },
dislikedMovies: { type: [String], default: [] },
watchHistory: {
  type: [{
    movieId: String
  }],
  default: []
},
genereClicked: { type: [String], default: [] },
rating: {
  type: [{
    movieId: String,
    rating: Number
  }],
  default: []
},
searchQueries: {
  type: [{
    query: String,
    searchedAt: Date
  }],
  default: []
}
}
)

module.exports = mongoose.model('user', UserSchema);