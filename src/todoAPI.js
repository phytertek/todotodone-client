import axios from 'axios';
import {
  actionsFrom,
  createAction,
  asyncMiddlewareFrom,
  reducerFrom,
  middlewareFrom
} from 'mrdux/creators';

import { evolve, remove, assign } from 'mrdux/object';

import { mapToId, createHttpActions } from 'mrdux/utilities';

import { API_HOST } from './config';

const api = createHttpActions(API_HOST, 'todos', axios);

const initState = {
  items: {},
  selected: null
};

export const todosReducer = reducerFrom(initState, {
  GET_ALL_TODOS_SUCCESS: todos => evolve({ items: () => mapToId(todos) }),
  ADD_TODO_SUCCESS: todo => evolve({ items: assign(todo._id)(todo) }),
  UPDATE_TODO_SUCCESS: todo => evolve({ items: assign(todo._id)(todo) }),
  REMOVE_TODO_SUCCESS: _id => evolve({ items: remove(_id) })
});

const asyncActionsModule = {
  GET_ALL_TODOS: async () => api.get('all'),
  ADD_TODO: async todo => api.post('add', todo),
  UPDATE_TODO: async todo => api.post('update', todo),
  REMOVE_TODO: async _id => api.post('remove', { _id })
};

export const todosAsyncActions = actionsFrom(asyncActionsModule);
export const todosAsyncMiddleware = asyncMiddlewareFrom(asyncActionsModule);
