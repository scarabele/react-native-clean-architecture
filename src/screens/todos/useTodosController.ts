import {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {Todo} from '@/types/Todo';
import useFactory from '@/hooks/useFactory';
import GetTodosByUser from '@/application/useCases/todos/getTodosByUser/GetTodosByUser';
import {RootRouteProps} from '@/routes';

const Todos = () => {
  const {repositoryFactory} = useFactory();
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const route = useRoute<RootRouteProps<'Todos'>>();
  const user = route.params?.user;

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true);
      const getTodosByUser = new GetTodosByUser(repositoryFactory);
      const output = await getTodosByUser.execute({id: user?.id});
      const mapper = output.map(todo => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
      }));
      setTodos(mapper);
      setIsLoading(false);
    };

    loadTodos();
  }, [user]);

  return {
    todos,
    isLoading,
  };
};

export default Todos;
