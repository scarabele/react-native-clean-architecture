import {useState, useEffect} from 'react';
import {Album} from '@/types/Album';
import useFactory from '@/hooks/useFactory';
import GetAlbumsByUser from '@/application/useCases/albums/getAlbumsByUser/GetAlbumsByUser';
import {useRoute} from '@react-navigation/native';
import {RootRouteProps} from '@/routes';

const Albums = () => {
  const {repositoryFactory} = useFactory();
  const [albums, setAlbums] = useState<Array<Album>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const route = useRoute<RootRouteProps<'Albums'>>();
  const user = route.params?.user;

  useEffect(() => {
    const loadAlbums = async () => {
      setIsLoading(true);
      const getAlbumsByUser = new GetAlbumsByUser(repositoryFactory);
      const output = await getAlbumsByUser.execute({id: user?.id});
      const mapper = output.map(album => ({id: album.id, title: album.title}));
      setAlbums(mapper);
      setIsLoading(false);
    };

    loadAlbums();
  }, [repositoryFactory, user]);

  return {
    albums,
    isLoading,
  };
};

export default Albums;
