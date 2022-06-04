import Album from '@/domain/entities/Album';

test('verifica se o album foi instanciado', () => {
  const album = new Album({id: 1, userId: 1, title: 'quidem molestiae enim'});
  expect(album.title).toBe('quidem molestiae enim');
});

test('verifica se os dados são atualizados', () => {
  const album = new Album({id: 1, userId: 1, title: 'quidem molestiae enim'});
  album.id = 2;
  album.title = 'quidem molestiae enim 2';
  album.userId = 2;
  expect(album.id).toBe(2);
  expect(album.title).toBe('quidem molestiae enim 2');
  expect(album.userId).toBe(2);
});
