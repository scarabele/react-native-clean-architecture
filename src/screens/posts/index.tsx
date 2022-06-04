import {Post} from '@/types/Post';
import React from 'react';
import {ScrollView} from 'react-native';
import {List, ActivityIndicator} from 'react-native-paper';

import usePostsController from './usePostsController';

const Posts = () => {
  const {posts, isLoading} = usePostsController();

  const renderItem = (post: Post, index: number) => {
    return <List.Item key={index} title={post.title} description={post.body} />;
  };

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>Suas postagens</List.Subheader>
        {isLoading && <ActivityIndicator animating={true} />}
        {posts.map(renderItem)}
      </List.Section>
    </ScrollView>
  );
};

export default Posts;
