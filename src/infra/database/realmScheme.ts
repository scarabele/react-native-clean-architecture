export const Post = {
  name: 'Post',
  properties: {
    id: 'int',
    title: 'string',
    userId: 'int',
    body: 'string',
  },
  primaryKey: 'id',
};

export const Album = {
  name: 'Album',
  properties: {
    id: 'int',
    title: 'string',
    userId: 'int',
  },
  primaryKey: 'id',
};

export const User = {
  name: 'User',
  properties: {
    id: 'int',
    name: 'string',
    email: 'string',
  },
  primaryKey: 'id',
};

export const Todo = {
  name: 'Todo',
  properties: {
    id: 'int',
    title: 'string',
    userId: 'int',
    completed: 'bool',
  },
  primaryKey: 'id',
};
