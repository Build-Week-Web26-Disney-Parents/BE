
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('comments').insert([
        {user_id: 1, post_id: 1, contents: "i can help you" },
        {user_id: 2, post_id: 2, contents: "i will totally help you"},
        {user_id: 3, post_id: 3, contents: "$0.50 cents an hour? i'm in!"},
        {user_id: 1, post_id: 3, contents: "I CAN HELP YOU" },
        {user_id: 2, post_id: 1, contents: "I WILL TOTALLY HELP YOU"},
        {user_id: 3, post_id: 2, contents: "$0.50 CENTS AN HOUR? I'M IN!"}
      ]);
    });
};
