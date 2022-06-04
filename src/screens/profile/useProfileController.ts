import {RootRouteProps, RootStackNavigation} from '@/routes';
import {User} from '@/types/User';
import {useNavigation, useRoute} from '@react-navigation/native';

enum Screen {
  Albums = 'Albums',
  Posts = 'Posts',
  Todos = 'Todos',
}

const useProfileController = () => {
  const navigation = useNavigation<RootStackNavigation>();
  const route = useRoute<RootRouteProps<'Profile'>>();
  const user: User = route.params?.user;

  const goScreen = (screen: Screen) => {
    navigation.navigate(screen, {user});
  };

  return {
    user,
    goScreen,
    Screen,
  };
};

export default useProfileController;
