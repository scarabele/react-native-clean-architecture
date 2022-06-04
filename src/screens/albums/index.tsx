import React from 'react';
import {ScrollView} from 'react-native';
import {List, ActivityIndicator} from 'react-native-paper';

import {Album} from '@/types/Album';
import useAlbumsController from './useAlbumsController';

const Albums = () => {
  const {albums, isLoading} = useAlbumsController();

  const renderItem = (album: Album, index: number) => {
    return (
      <List.Item
        key={index}
        title={album.title}
        left={() => <List.Icon icon="image-album" />}
      />
    );
  };

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>Seus Álbuns</List.Subheader>
        {isLoading && <ActivityIndicator animating={true} />}
        {albums.map(renderItem)}
      </List.Section>
    </ScrollView>
  );
};

export default Albums;
