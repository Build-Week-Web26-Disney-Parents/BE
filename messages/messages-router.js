const db = require("../data/dbConfig");
const { jwtSecret } = require("../authConfig/secrets");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const restrictedMW = require("../users/restrictedMW");

router.post("/:id", restrictedMW, (req, res) => {
  const payload = {
    ...req.body,
    from_id: req.user.id,
    to_id: req.params.id
  };

  db("messages")
    .insert(payload)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: "can't send message" });
    });
});

router.get("/", restrictedMW, (req, res) => {
  db("messages")
    .where("messages.to_id", req.user.id)
    .orWhere("messages.from_id", req.user.id)
    .join("users as users1", "messages.from_id", "users1.id")
    .join("users as users2", "messages.to_id", "users2.id")
    .select(
      "users1.name as sender_name",
      "users1.id as sender_id",
      "users2.name as reciever_name",
      "users2.id as reciever_id"
    )
    .then(results => {
      resultsArr = [];
      for (let i = 0; i < results.length; i++) {
        let payload = {
          name: "",
          id: ""
        };
        if (results[i].sender_name === req.user.name) {
          payload.name = results[i].reciever_name;
          payload.id = results[i].reciever_id;
        } else {
          payload.name = results[i].sender_name;
          payload.id = results[i].sender_id;
        }

        resultsArr.push(payload);
      }

      function removeDuplicates(array, key) {
        let lookup = {};
        let result = [];
        for (let i = 0; i < array.length; i++) {
          if (!lookup[array[i][key]]) {
            lookup[array[i][key]] = true;
            result.push(array[i]);
          }
        }
        return result;
      }
      const finalResult = removeDuplicates(resultsArr, "id");

      res.status(200).json(finalResult);
    })
    .catch(err => {
      console.log("err", err);
      res.status(500).json({ error: "can't retreive users" });
    });
});

router.get("/:id", restrictedMW, (req, res) => {
  db("messages")
    .where(function() {
      this.where("messages.to_id", req.params.id).orWhere(
        "messages.from_id",
        req.params.id
      );
    })
    .andWhere(function() {
      this.where("messages.from_id", req.user.id).orWhere(
        "messages.to_id",
        req.user.id
      );
    })
    .join("users as users1", "messages.from_id", "users1.id")
    .join("users as users2", "messages.to_id", "users2.id")
    .select(
      "messages.message",
      "users1.name as sender_name",
      "users1.id as sender_id",
      "users2.name as reciever_name",
      "users2.id as reciever_id"
    )
    .then(result => {
      res.status(200).json(result);
    });
});

module.exports = router;
