import {User} from '@/types/User';
import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import {
  List,
  ActivityIndicator,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';

import useHomeController from './useHomeController';

const Home = () => {
  const {users, isLoading, onPressUser, isDownloading} = useHomeController();

  const renderItem = (user: User, index: number) => {
    return (
      <TouchableOpacity onPress={() => onPressUser(user)} key={index}>
        <List.Item
          title={user.name}
          description={user.email}
          left={() => <List.Icon icon="account" />}
          right={() => <List.Icon color="#000" icon="chevron-right" />}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <ScrollView>
        <List.Section>
          <List.Subheader>Selecione o usuário</List.Subheader>
          {isLoading && <ActivityIndicator animating={true} />}
          {users.map(renderItem)}
        </List.Section>
      </ScrollView>
      <Portal>
        <Dialog visible={isDownloading}>
          <Dialog.Content>
            <Paragraph>Sincronizando informações</Paragraph>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};

export default Home;
