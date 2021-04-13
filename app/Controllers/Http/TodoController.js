'use strict'

const Todo = use('App/Models/Todo');


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with litas
 */
class TodoController {
  /**
   * Show a list of all litas.
   * GET litas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth }) {
      const user = await auth.getUser();
      
      return await user.todo().fetch();


  }

  /**
   * Render a form to be used for creating a new lita.
   * GET litas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, auth}) {
    const user = await auth.getUser();
    const {title} = request.all();
    const todo = new Todo();

    todo.fill({
      title,
    });


    await user.todo().save(todo);
    return todo;

  }

  /**
   * Create/save a new lita.
   * POST litas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single lita.
   * GET litas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing lita.
   * GET litas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update lita details.
   * PUT or PATCH litas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response , auth}) {

    const user = await auth.getUser();
    const {id } =  params;
    const todo = await Todo.find(id);
    todo.merge(request.only('title'))

    if (todo.user_id !== user.id){
      return response.status(403);
    }
    
    await todo.save();


  }

  /**
   * Delete a lita with id.
   * DELETE litas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth , response}) {

    const user = await auth.getUser();
    const {id } =  params;
    const todo = await Todo.find(id);

    if (todo.user_id !== user.id){
      return response.status(403);
    }

    await todo.delete();

  }
}

module.exports = TodoController;