// Define a reaction schema, but not the associated model.
// Other schemas will create objects from the reaction
// schema directly, meaning they will not be associated
// with unique IDs.
const { Schema, Types } = require("mongoose");

// Simple function for using built-in Date functionality
// for Date string formatting.
function formatDate(date) {
  let formattedDate = new Date(date);
  return formattedDate.toDateString();
}

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = reactionSchema;
