'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Task extends Model {
    todo(){
        return this.belongsTo('App/Models/Todo');
    }
}

module.exports = Task;
