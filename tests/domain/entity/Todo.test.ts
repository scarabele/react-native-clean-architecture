import Todo from '@/domain/entities/Todo';

test('verifica se a tarefa está completa', () => {
  const todo = new Todo({
    id: 1,
    userId: 1,
    title: 'delectus aut autem',
    completed: true,
  });
  expect(todo.completed).toBe(true);
});

test('verifica se os dados são atualizados', () => {
  const todo = new Todo({
    id: 1,
    userId: 1,
    title: 'delectus aut autem',
    completed: true,
  });
  todo.id = 2;
  todo.title = 'delectus aut autem 2';
  todo.userId = 2;
  todo.completed = false;
  expect(todo.id).toBe(2);
  expect(todo.title).toBe('delectus aut autem 2');
  expect(todo.userId).toBe(2);
  expect(todo.completed).toBe(false);
});
