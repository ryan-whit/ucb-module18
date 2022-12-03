// Define the Thought model and associated Schema
const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtTest: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// Create a virtual method with a getter for returning the
// number of reactions associated with the User's reactions.
thoughtSchema
  .virtual("reactionCount")
  // Getter method
  .get(function () {
    return this.reactions.length;
  })

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
