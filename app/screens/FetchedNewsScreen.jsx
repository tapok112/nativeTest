import React, { useState, useEffect, useContext } from 'react';

import { ScrollView, Image, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';

import { AppContext } from '../AppContext';
import Pagination from '../components/helpers/pagination';

import { useSelector } from 'react-redux';

import { api, requestTransform } from '../routes/routes';
import { styles } from '../styles/styles-component';

export default function FetchedNewsScreen({ navigation }) {
  const [news, setNews] = useState([]);
  const [currentNews, setCurrentNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { setIsLoading } = useContext(AppContext);

  const newsPerPage = 10;
  const lastNewsIndex = currentPage * newsPerPage;
  const firstNewsIndex = lastNewsIndex - newsPerPage;

  const authData = useSelector(state => state.authData);

  const fetchNews = async () => {
    setIsLoading(true);

    const response = await api.news;

    if (response.ok) {
      requestTransform(authData);

      setNews(response.data.news.concat(response.data.news));
    } Alert.alert(response.data.errors.toString());
  }

  const handlePressNewsItem = (id) => {
    navigation.navigate('NewsItem', {
      newsID: id
    })
  }

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect (() => {
    fetchNews().then(setIsLoading(false));
  }, []);

  useEffect(() => {
    setCurrentNews(news.slice(firstNewsIndex, lastNewsIndex))
  }, [news, currentPage]);

  return (
    <ScrollView>
      {currentNews.map((item, index) => (
        <ListItem key={Number(`${item.id}${index}`)} bottomDivider onPress={() => handlePressNewsItem(item.id)}>
          <Image style={styles.newsImage} source={{uri: item.image_url}} />
 
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>

            <HTMLView style={{ height: 20 }} value={item.body} />
          </ListItem.Content>
        </ListItem>
      ))}

      {news.length > 5 &&
        <Pagination newsPerPage={newsPerPage}
                    totalNews={news.length}
                    handleChangePage={onPageChange}
                    currentPage={currentPage} />
      }
    </ScrollView>
  );
}
