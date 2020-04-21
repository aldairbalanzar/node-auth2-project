
exports.seed = function(knex) {
  return knex('users').insert([
        {username: 'joe', password: 'password'},
        {username: 'moe', password: 'password'},
        {username: 'bo', password: 'password'}
      ]);
    };
