
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {user_id: 1, title: "need childcare", contents: "i'm trying to ride this ride, and my kids too short."},
        {user_id: 2, title: "want childcare", contents: "tired of my kid"},
        {user_id: 3, title: "require childcare", contents: "paying $0.50 cents an hour "}
        
      ]);
    });
};
