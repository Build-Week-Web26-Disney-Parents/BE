const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("./users-model.js");
const restricted = require("./restrictedMW");
const { jwtSecret } = require("../authConfig/secrets");
const jwt = require("jsonwebtoken");

router.get("/", restricted, (req, res) => {
  const payload = {
    id: 0,
    username: "",
    password: "",
    email: "",
    name: "",
    role: "",
    phone: "",
    numberOfChildren: "",
    location: "",
    posts: []
  };

  Users.findById(req.user.id)
    .then(users => {
      payload.id = users.id
      payload.username = users.username;
      payload.password = users.password;
      payload.email = users.email;
      payload.name = users.name;
      payload.role = users.role;
      payload.phone = users.phone;
      payload.numberOfChildren = users.numberOfChildren;
      payload.location = users.location;

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "can't find user profile" });
    });

  Users.findPosts(req.user.id)
    .then(post => {
      payload.posts = post;
      res.status(200).json(payload);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "can't get post " });
    });
});

router.get("/:id", restricted, (req, res) => {
  const payload = {
    id: 0,
    username: "",
    password: "",
    email: "",
    name: "",
    role: "",
    phone: "",
    numberOfChildren: "",
    location: "",
    posts: []
  };

  Users.findById(req.params.id)
    .then(user => {
      payload.id = user.id;
      payload.username = user.username;
      payload.password = user.password;
      payload.name = user.name;
      payload.role = user.role;
      payload.phone = user.phone;
      payload.numberOfChildren = user.numberOfChildren;
      payload.location = user.location;
      payload.email = user.email;
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "can't get user" });
    });

  Users.findPosts(req.params.id)
    .then(post => {
      payload.posts = post;
      res.status(200).json(payload);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "can't get post " });
    });
});

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  console.log("first",user)
  Users.add(user)
    .then(newUser => {
      console.log(newUser)
      res.status(201).json(newUser);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: "Username or Password invalid" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/", restricted, (req, res) => {
  if (
    !req.body.username &&
    !req.body.password &&
    !req.body.email &&
    !req.body.name &&
    !req.body.role &&
    !req.body.phone &&
    !req.body.numberOfChildren &&
    !req.body.location
  ) {res.status(401).json ({ error: "Must change at least one value" })}
    Users.update(req.user.id, req.body)
      .then(updated => res.status(200).json(updated))
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "can't update user" });
      });
});

router.delete("/", restricted, (req, res) => {
  Users.remove(req.user.id)
    .then(deleted => res.status(200).json(deleted))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "can't delete user" });
    });
});

function signToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    name: user.name
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
