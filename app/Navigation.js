import React from 'react';

import { Text, Button } from 'react-native';
import { Avatar } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from './screens/AuthScreen';
import FetchedNewsScreen from './screens/FetchedNewsScreen';
import NewsItemScreen from './screens/NewsItemScreen';

import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from './store/actionCreators';

import { isAuth, primary, styles } from './styles/styles-component';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const dispatch = useDispatch();

  const userData = useSelector(state => state.user);

  function logOut() {
    dispatch(setUserData({user: null, authData: null}));
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!userData ? (
          <Stack.Group>
            <Stack.Screen name="AuthScreen"
                          component={AuthScreen}
                          options={{
                            title: 'Авторизация',
                            headerStyle: {
                              backgroundColor: primary
                            }
                          }} />
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={() => ({
                         headerLeft: () => userData && <Avatar rounded style={styles.avatar} source={{ uri: userData.avatar_url }} />,
                         headerRight: () => <Button color={primary} title='Выход' onPress={logOut} />,
                         headerTitle: () => <Text style={styles.text}>{userData.username}</Text>,
                         headerStyle: {
                           backgroundColor: isAuth
                         }
                       })}>
            <Stack.Screen name="News"
                          component={FetchedNewsScreen} />

            <Stack.Screen name="NewsItem"
                          component={NewsItemScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
