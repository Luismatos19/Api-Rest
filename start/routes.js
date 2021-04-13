'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.post('/register' , 'AuthController.register');
Route.post('/authenticate' , 'AuthController.authenticate');

Route.get('/app', 'AppController.index').middleware(['auth']);



Route.get('todo', 'TodoController.index').middleware('auth');
Route.post('todo', 'TodoController.create').middleware('auth');
Route.delete('todo/:id', 'TodoController.destroy').middleware('auth');
Route.patch('todo/:id', 'TodoController.update').middleware('auth');

Route.get('todo/:id/task', 'TaskController.index').middleware('auth');
Route.post('todo/:id/task', 'TaskController.create').middleware('auth');
Route.delete('task/:id', 'TaskController.destroy').middleware('auth');
Route.patch('task/:id', 'TaskController.update').middleware('auth');