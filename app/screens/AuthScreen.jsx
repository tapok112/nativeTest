import React, { useState, useContext } from 'react';

import { View, Button, Alert } from 'react-native';

import { AppContext } from '../AppContext';
import { InputWrapper } from '../components/helpers/InputWrapper';

import { useDispatch } from 'react-redux';
import { setUserData } from '../store/actionCreators';

import { api } from '../routes/routes';
import { isAuth, styles } from '../styles/styles-component';

export default function AuthScreen() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const { setIsLoading } = useContext(AppContext); 

  const dispatch = useDispatch();

  const handlePressLoginButton = async() => {
    setIsLoading(true);

    const response = await api.auth(email, password);

    if (response.ok) {
      dispatch(setUserData({
        user: response.data.user,
        authData: {
          accessToken: response.headers['access-token'],
          client: response.headers.client,
          uid: response.headers.uid
        }        
      }))
    } else Alert.alert(response.data.errors.toString());

    setIsLoading(false);
  }

  return (
    <View style={styles.container}>
      <InputWrapper type='login' inputValue={email} setInputValue={setEmail} />
      <InputWrapper type='password' inputValue={password} setInputValue={setPassword} />
      
      <Button color={isAuth}
              title={'Войти'}
              onPress={handlePressLoginButton}
              disabled={!password.trim() || !email.trim()} />
    </View>
  );
}
