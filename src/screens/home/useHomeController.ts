import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {User} from '@/types/User';
import useFactory from '@/hooks/useFactory';
import GetUsers from '@/application/useCases/users/getUsers/GetUsers';
import DownloadAll from '@/application/useCases/downloadAll/DownloadAll';
import {RootStackNavigation} from '@/routes';

const useHomeController = () => {
  const navigation = useNavigation<RootStackNavigation>();
  const {repositoryFactory} = useFactory();
  const [users, setUsers] = useState<Array<User>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  useEffect(() => {
    download();
  }, []);

  const download = async () => {
    setIsDownloading(true);
    const downloadAll = new DownloadAll(repositoryFactory);
    await downloadAll.execute();
    setIsDownloading(false);
    loadUsers();
  };

  const loadUsers = async () => {
    setIsLoading(true);
    const getUsers = new GetUsers(repositoryFactory);
    const output = await getUsers.execute();
    const mapper = output.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
    setUsers(mapper);
    setIsLoading(false);
  };

  const onPressUser = (user: User) => {
    navigation.navigate('Profile', {user});
  };

  return {
    users,
    isLoading,
    onPressUser,
    isDownloading,
  };
};

export default useHomeController;
