import {Todo} from '@/types/Todo';
import React from 'react';
import {ScrollView} from 'react-native';
import {List, ActivityIndicator} from 'react-native-paper';
import useTodosController from './useTodosController';

const TodosView = () => {
  const {isLoading, todos} = useTodosController();

  const renderItem = (todo: Todo, index: number) => {
    const renderCheck = () => {
      if (todo.completed) {
        return <List.Icon icon="checkbox-marked-outline" />;
      }
      return <List.Icon icon="checkbox-blank-outline" />;
    };
    return <List.Item key={index} title={todo.title} right={renderCheck} />;
  };

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>Seus Álbuns</List.Subheader>
        {isLoading && <ActivityIndicator animating={true} />}
        {todos.map(renderItem)}
      </List.Section>
    </ScrollView>
  );
};

export default TodosView;
