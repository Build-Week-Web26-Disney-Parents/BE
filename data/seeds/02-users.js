exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "userbob",
          password: "pass",
          email: "bob@gmail.com",
          name: "bob",
          role: "parent",
          phone: "407-421-5465",
          numberOfChildren: 2,
          location: "candy mountain"
        },
        {
          username: "tony",
          password: "pass",
          email: "tony@gmail.com",
          name: "tony",
          role: "parent",
          phone: "407-441-5445",
          numberOfChildren: 1,
          location: "pirates of the caribbean"
        },
        {
          username: "josh",
          password: "pass",
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
