import React from 'react';
import {TouchableOpacity} from 'react-native';
import {List} from 'react-native-paper';
import useProfileController from './useProfileController';

const Profile = () => {
  const {user, goScreen, Screen} = useProfileController();

  return (
    <List.Section>
      <List.Subheader>Olá, {user.name} </List.Subheader>
      <TouchableOpacity onPress={() => goScreen(Screen.Posts)}>
        <List.Item
          title={'Postagens'}
          description={'Lista de postagens do usuário'}
          left={() => <List.Icon icon="post" />}
          right={() => <List.Icon color="#000" icon="chevron-right" />}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => goScreen(Screen.Albums)}>
        <List.Item
          title={'Álbuns'}
          description={'Lista de álbuns do usuário'}
          left={() => <List.Icon icon="image-album" />}
          right={() => <List.Icon color="#000" icon="chevron-right" />}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => goScreen(Screen.Todos)}>
        <List.Item
          title={'Tarefas'}
          description={'Lista de tarefas do usuário'}
          left={() => <List.Icon icon="list-status" />}
          right={() => <List.Icon color="#000" icon="chevron-right" />}
        />
      </TouchableOpacity>
    </List.Section>
  );
};

export default Profile;
