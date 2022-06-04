import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  RouteProp,
} from '@react-navigation/native';
import {
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import merge from 'deepmerge';
import Home from '@/screens/home/index';
import Profile from '@/screens/profile/index';
import Posts from '@/screens/posts/index';
import Albums from '@/screens/albums/index';
import Todos from '@/screens/todos/index';
import {User} from '@/types/User';

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);

export type RootStackParamList = {
  Home: undefined;
  Profile: {user: User};
  Posts: {user: User};
  Albums: {user: User};
  Todos: {user: User};
};

export type RootRouteProps<RouteName extends keyof RootStackParamList> =
  RouteProp<RootStackParamList, RouteName>;

export type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RoutesContainer() {
  return (
    <PaperProvider theme={CombinedDefaultTheme}>
      <NavigationContainer theme={CombinedDefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Início'}}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{title: 'Perfil'}}
          />
          <Stack.Screen
            name="Posts"
            component={Posts}
            options={{title: 'Postagens'}}
          />
          <Stack.Screen
            name="Albums"
            component={Albums}
            options={{title: 'Álbuns'}}
          />
          <Stack.Screen
            name="Todos"
            component={Todos}
            options={{title: 'Tarefas'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default RoutesContainer;
