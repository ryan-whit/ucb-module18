const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { createThought } = require("../controllers/thoughtController");
const { promisify } = require("util");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing content
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [
    {
      username: "RWhit",
      email: "ryan@email.com",
    },
    {
      username: "BobJ",
      email: "bobj@email.com",
    },
    {
      username: "EmiliaF",
      email: "emiliaf@email.com",
    },
  ];

  await User.collection.insertMany(users);

  const thoughts = [
    {
      thoughtTest:
        "Watching Elon light $44b on fire in real time is incredible",
      username: "EmiliaF",
      reactions: [
        {
          reactionBody: "What a train wreck.",
          username: "BobJ",
        },
        {
          reactionBody: "Who could have possibly seen this coming?",
          username: "RWhit",
        },
      ],
    },
    {
      thoughtTest: "$8/month for this hellsite?",
      username: "RWhit",
      reactions: [
        {
          reactionBody: "For sure isn't going to bring in enough revenue.",
          username: "BobJ",
        },
        {
          reactionBody: "This place is terrible.",
          username: "EmiliaF",
        },
      ],
    },
  ];

  // const createThoughtPromise = promisify(createThought);

  // async function seedThought(req, res) {
  // 	createThoughtPromise()
  // }

	// async function seedThoughts(_thoughts) {
	// 	_thoughts.forEach((thought) => {
	// 		Thought.create(thought).then((thoughtres) => {
	// 			return User.findOneAndUpdate(
	// 				{ username: thoughtres.username },
	// 				{ $push: { thoughts: thoughtres._id } },
	// 				{ new: true }
	// 			);
	// 		});
	// 	});
	// };

	// await seedThoughts(thoughts);

  // await Thought.collection.insertMany(thoughts);

  process.exit(0);
});
