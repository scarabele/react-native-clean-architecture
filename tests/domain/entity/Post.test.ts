import Post from '@/domain/entities/Post';

test('verifica se a postagem foi instanciada', () => {
  const post = new Post({
    id: 1,
    userId: 1,
    title: 'delectus aut autem',
    body: 'quia et suscipit',
  });
  expect(post.id).toBe(1);
});

test('verifica se os dados são atualizados', () => {
  const post = new Post({
    id: 1,
    userId: 1,
    title: 'delectus aut autem',
    body: 'quia et suscipit',
  });
  post.id = 2;
  post.title = 'delectus aut autem 2';
  post.userId = 2;
  post.body = 'quia et suscipit 2';
  expect(post.id).toBe(2);
  expect(post.title).toBe('delectus aut autem 2');
  expect(post.userId).toBe(2);
  expect(post.body).toBe('quia et suscipit 2');
});
