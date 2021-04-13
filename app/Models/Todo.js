'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Todo extends Model {
    user(){
        return this.belongsTo('App/Models/User')
    }
    task(){
        return this.hasMany("App/Models/Task");
      }
}

module.exports = Todo;
