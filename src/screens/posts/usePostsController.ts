import GetPostsByUser from '@/application/useCases/posts/getPostsByUser/GetPostsByUser';
import {Post} from '@/types/Post';
import {useRoute} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import useFactory from '@/hooks/useFactory';
import {RootRouteProps} from '@/routes';

const usePostsControler = () => {
  const {repositoryFactory} = useFactory();
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const route = useRoute<RootRouteProps<'Posts'>>();
  const user = route.params?.user;

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    const getPostsByUser = new GetPostsByUser(repositoryFactory);
    const output = await getPostsByUser.execute({id: user?.id});
    const mapper = output.map(post => ({
      id: post.id,
      title: post.title,
      body: post.body,
    }));
    setPosts(mapper);
    setIsLoading(false);
  };

  return {
    posts,
    isLoading,
  };
};

export default usePostsControler;
