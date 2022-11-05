const User = require("../models/User");

module.exports = {
  // Get all Users
  getUsers(_req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // TODO: delete user's thoughts and friends as well
  // deleteUser(req, res) {
  //   Student.findOneAndRemove({ _id: req.params.studentId })
  //     .then((student) =>
  //       !student
  //         ? res.status(404).json({ message: 'No such student exists' })
  //         : Course.findOneAndUpdate(
  //             { students: req.params.studentId },
  //             { $pull: { students: req.params.studentId } },
  //             { new: true }
  //           )
  //     )
  //     .then((course) =>
  //       !course
  //         ? res.status(404).json({
  //             message: 'Student deleted, but no courses found',
  //           })
  //         : res.json({ message: 'Student successfully deleted' })
  //     )
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // },

  // Add a friend to the User's list of friends
  addFriend(req, res) {
    console.log("You are adding a Friend (User).");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID :(" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
