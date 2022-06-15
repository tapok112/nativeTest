import React, { useState, useEffect, useContext } from 'react';

import { Image, View, Text, Alert } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { useSelector } from 'react-redux';

import { AppContext } from '../AppContext';

import { api, requestTransform } from '../routes/routes';
import { styles } from '../styles/styles-component';

export default function NewsItemScreen({ route }) {
  const [newsItem, setNewsItem] = useState([]);

  const { setIsLoading } = useContext(AppContext); 

  const authData = useSelector(state => state.authData);

  const {newsID} = route.params;

  const fetchNewsItem = async () => {
    setIsLoading(true);

    const response = await api.selectedNews(newsID);

    if (response.ok) {
      requestTransform(authData);

      setNewsItem(response.data.news);
    } Alert.alert(response.data.errors.toString());
  }

  useEffect (() => {
    fetchNewsItem().then(setIsLoading(false));
  }, [])

  return (
    <View>
      <Image style={styles.newsImageFull} source={{uri: newsItem.image_url}} />
  
      <View style={{ justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{ marginBottom: 20 }}>{newsItem.title}</Text>

        <HTMLView style={{ height: 20 }} value={newsItem.body} />
      </View>
    </View>
  )
}