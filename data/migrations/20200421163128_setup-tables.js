exports.up = function(knex) {
    return knex.schema
  //users table
     .createTable('users', tbl => { 
      tbl.integer('id', 255).primary();    //unique id column for user.
      tbl.string('username', 128)         //username column.
        .notNullable()
      tbl.string('password', 128)       //password column
        .notNullable()
    })
  //foods table
      .createTable('foods', tbl => {
        tbl.integer('id', 255).primary();                      //unique id column for food.
        tbl.string('foodName', 255).unique().notNullable();   //foodName column
        tbl.text('description'); //description column
    })
  //column with foreign keys. ties the users and foods table together
      .createTable('user_foods', tbl => {
        //user foreign key
        tbl.integer('user_id', 255)      //holds foreign key (user_id) to a user
        .notNullable()
        .references('users.id')        //ties foreign key to the primary id of a user in the users table. (user_id --> users.id)
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
        //food foreign key
        tbl.integer('food_id', 255)   //hollds foreign key (food_id) to a food
        .notNullable()
        .references('foods.id')      //ties foreign key to the primary id of a food in the foods table. (food_id --> foods.id)
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');

        tbl.primary(['user_id', 'food_id']); //unique id column for each instance of a user and a food tied together.
    })
}
  
  exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('user_foods')
    .dropTableIfExists('foods')
    .dropTableIfExists('users')

  };