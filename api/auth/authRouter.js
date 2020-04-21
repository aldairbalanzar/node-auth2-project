const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users-model");
const secrets = require("../secrets");

router.post("/register", (req, res) => {
  let user = req.body; // username, password

  // rounds are 2 to the N times
  const rounds = process.env.HASH_ROUNDS || 14;

  // hash the user.password
  const hash = bcrypt.hashSync(user.password, rounds);

  // update the user to use the hash
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: error.message });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      // checks if user is found, if so, also checks if passwords match
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ message: "Welcome!", token });
      } else {
        res.status(401).json({ message: "bro, log in..." });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: error.message });
    });
});

//function that creates a token
function generateToken(user) {
  // the data
  const payload = {
    userId: user.id,
    username: user.username,
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;