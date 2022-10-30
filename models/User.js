const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      // "unique" is not a validator. Use in combination
      // with dropDups to ensure that the username is unique.
      // More info:
      // https://mongoosejs.com/docs/validation.html#the-unique-option-is-not-a-validator
      dropDups: true,
      trim: true,  // Remove leading and trailing whitespace
    },
    email: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
      validate: {
        validator: function(value) {
          // Email regex, e.g., my@email.com
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        },
        message: props => `${props.value} is not a valid email address!`
      },
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('User', userSchema);

module.exports = User;
