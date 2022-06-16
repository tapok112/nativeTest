import React, { useState, useEffect, useContext } from 'react';

import { Image, View, Text, Alert } from 'react-native';
import HTMLView from 'react-native-htmlview';

import { AppContext } from '../AppContext';

import { api } from '../routes/routes';
import { styles } from '../styles/styles-component';

export default function NewsItemScreen({ route }) {
  const [newsItem, setNewsItem] = useState([]);

  const { setIsLoading } = useContext(AppContext);

  const {newsID} = route.params;

  const fetchNewsItem = async () => {
    setIsLoading(true);

    const response = await api.selectedNews(newsID);

    if (response.ok) {
      setNewsItem(response.data.news);
    } else Alert.alert(response.data.errors.toString());
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