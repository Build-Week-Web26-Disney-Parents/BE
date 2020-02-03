const bcrypt = require("bcryptjs")
const hash = bcrypt.hashSync("pass",8)



exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "userbob",
          password: hash,
          email: "bob@gmail.com",
          name: "bob",
          role: "parent",
          phone: "407-421-5465",
          numberOfChildren: 2,
          location: "candy mountain"
        },
        {
          username: "tony",
          password: hash,
          email: "tony@gmail.com",
          name: "tony",
          role: "parent",
          phone: "407-441-5445",
          numberOfChildren: 1,
          location: "pirates of the caribbean"
        },
        {
          username: "josh",
          password: hash,
          email: "josh@gmail.com",
          name: "josh",
          role: "contractor",
          phone: "407-123-5465",
          numberOfChildren: 0,
          location: "rip ride rocket"
        }
      ]);
    });
};
