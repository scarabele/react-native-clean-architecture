import axios from 'axios';
import TodoRepositoryFake from '@/infra/repositories/fake/TodoRepositoryFake';
import TodoRepository from '@/domain/repositories/TodoRepository';
import AxiosClient from '@/infra/httpClient/AxiosClient';
import Todo from '@/domain/entities/Todo';

jest.mock('axios');
let todoRepository: TodoRepository;

beforeEach(async function () {
  (axios.create as jest.Mock).mockReturnThis();
  const axiosClient = new AxiosClient();
  todoRepository = new TodoRepositoryFake(axiosClient);
});

test('lista todas as tarefas', async () => {
  const todos = await todoRepository.getAll();
  expect(todos[0].id).toBe(1);
});

test('lista todas as tarefas do usuário', async () => {
  const todos = await todoRepository.getByUserId(1);
  expect(todos[0].userId).toBe(1);
});

test('lista todos as tarefas da API', async () => {
  const fakeResp = {
    data: [
      {userId: 1, id: 1, title: 'delectus aut autem', completed: false},
      {
        userId: 1,
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        completed: false,
      },
    ],
  };
  (axios.get as jest.Mock).mockResolvedValue(fakeResp);
  const todos = await todoRepository.getRemoteAll();
  expect(todos[0].id).toBe(1);
});

test('salvar todas as tarefas', async () => {
  const todo1 = new Todo({
    id: 1,
    title: 'delectus aut autem',
    userId: 1,
    completed: false,
  });
  const todo2 = new Todo({id: 2, title: 'task 2', userId: 1, completed: false});
  const todo3 = new Todo({id: 3, title: 'task 3', userId: 1, completed: true});
  await todoRepository.saveAll([todo1, todo2, todo3]);
  const todos = await todoRepository.getAll();
  expect(todos.length).toBe(3);
});
