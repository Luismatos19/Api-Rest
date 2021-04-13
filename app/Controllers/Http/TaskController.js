'use strict';

const Task = use('App/Models/Task');
const Todo = use('App/Models/Todo');

//const { post } = require('@adonisjs/framework/src/Route/Manager');
//const TasksSchema = require('../../../database/migrations/1618093390698_tasks_schema')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tasks
 */
class TaskController {
  /**
   * Show a list of all tasks.
   * GET tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({auth , request, response, params}) { 
    const user = await auth.getUser();
    const {id} = params;
    const todo = await Todo.find(id);

    if (todo.user_id !== user.id){
      return response.status(403);
      }

    return await  todo.task().fetch();
  }

  /**
   * Render a form to be used for creating a new task.
   * GET tasks/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request , auth , params , response}) {

      const user = await auth.getUser();
      const { task, checked } = request.all();
      const {id} = params;
      const todo = await Todo.find(id);
      
      if (todo.user_id !== user.id){
      return response.status(403);
      }

      const tasks = new Task();

      tasks.fill({
        task ,
        checked
        
      });

      await todo.task().save(tasks);

      return tasks;
  }

  /**
   * Create/save a new task.
   * POST tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */


  /**
   * Display a single task.
   * GET tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


  /**
   * Render a form to update an existing task.
   * GET tasks/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  
  
  async update ({ params, request, auth, response}) {

    const user = await auth.getUser();
    const { id } =  params;
    const task = await Task.find(id);
    


    task.merge(request.only([
      'task',
      'checked'
    ]));
    await task.save();
    return task;
  

  }
  

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
 
  async destroy ({ params, auth, response }) {

    const user = await auth.getUser();
    const { id } =  params;
    const task = await Task.find(id);
    
    

   await task.delete(); 
   
    

    
  }
  
}

module.exports = TaskController;
