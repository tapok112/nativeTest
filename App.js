import React, { useState } from 'react';

import { ActivityIndicator, View } from 'react-native';

import { AppContext } from './app/AppContext';

import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store/configureStore';

import Navigation from './app/Navigation';

import { styles } from './app/styles/styles-component';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider value = {{ isLoading, setIsLoading }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {isLoading ? <View style={styles.loadingIndicator}><ActivityIndicator size="large" /></View> : <Navigation />}
        </PersistGate>
      </Provider>
    </AppContext.Provider>
  );
}
