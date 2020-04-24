exports.seed = function(knex) {
  return knex('foods').insert([
        {foodName: 'pizza'},
        {foodName: 'burger'},
        {foodName: 'grilled chicken'}
      ]);
    };
