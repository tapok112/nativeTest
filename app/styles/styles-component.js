import { StyleSheet } from 'react-native';

export const primary = '#FF696B',
             isAuth = '#2E7544',
             background = '#CEDFCE',
             black = '#191919',
             white = '#E3E9E2'

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: background,
    alignItems: 'center',
    marginBottom: 15,
    height: '100%'
  },
  loadingIndicator: {
    flex:1,
    justifyContent: 'center'
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginRight: 15
  },
  text: {
    color: 'white',
    fontSize: 20
  },
  input: {
    width: '70%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: black,
    marginBottom: 15
  },
  newsImage: {
    height: 50,
    width: 50,
    borderRadius: 10
  },
  newsImageFull: {
    height: 400,
    width: '100%',
    marginBottom: 20
  },
  pagination: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    marginRight: 15,
    currentPage: {}
  },
  currentPage: {
    marginRight: 20,
    fontSize: 25,
    fontWeight: '800',
    color: 'blue'
  }
})