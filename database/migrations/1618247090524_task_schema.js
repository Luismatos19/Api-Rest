'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.integer('todo_id').unsigned().notNullable().references('id').inTable('todos').onUpdate('CASCADE').onDelete('CASCADE');
      
      table.varchar('task', 300).notNullable();
      table.boolean('checked').notNullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
