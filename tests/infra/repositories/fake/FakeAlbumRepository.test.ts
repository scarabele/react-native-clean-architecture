import axios from 'axios';
import AlbumRepositoryFake from '@/infra/repositories/fake/AlbumRepositoryFake';
import AlbumRepository from '@/domain/repositories/AlbumRepository';
import AxiosClient from '@/infra/httpClient/AxiosClient';
import Album from '@/domain/entities/Album';

jest.mock('axios');
let albumRepository: AlbumRepository;

beforeEach(async function () {
  (axios.create as jest.Mock).mockReturnThis();
  const axiosClient = new AxiosClient();
  albumRepository = new AlbumRepositoryFake(axiosClient);
});

test('lista todos os álbuns', async () => {
  const albums = await albumRepository.getAll();
  expect(albums[0].id).toBe(1);
});

test('lista todos os álbuns do usuário', async () => {
  const albums = await albumRepository.getByUserId(1);
  expect(albums[0].userId).toBe(1);
});

test('lista todos os álbuns da API', async () => {
  const fakeResp = {
    data: [
      {userId: 1, id: 1, title: 'quidem molestiae enim'},
      {userId: 1, id: 2, title: 'sunt qui excepturi placeat culpa'},
    ],
  };
  (axios.get as jest.Mock).mockResolvedValue(fakeResp);
  const albums = await albumRepository.getRemoteAll();
  expect(albums[0].id).toBe(1);
});

test('salvar todos os albums', async () => {
  const album1 = new Album({id: 1, title: 'quidem molestiae enim', userId: 1});
  const album2 = new Album({
    id: 2,
    title: 'sunt qui excepturi placeat culpa',
    userId: 1,
  });
  const album3 = new Album({id: 3, title: 'omnis laborum odio', userId: 1});
  await albumRepository.saveAll([album1, album2, album3]);
  const albums = await albumRepository.getAll();
  expect(albums.length).toBe(3);
});
