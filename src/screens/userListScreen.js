import {useMutation, useQuery} from 'react-query';
import makePostRequest from '../utils/makePostRequest';
import {crudApi} from '../api/url';
import UserCard from '../components/userCard';
import {useEffect, useState} from 'react';
import makeGetRequest from '../utils/makeGetRequest';

const {
  View,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} = require('react-native');
import {CustomIcon} from '../components/customIcon';
import Add from '@iconscout/react-native-unicons/icons/uil-plus';
const UserListScreen = ({navigation}) => {
  const [userData, setUserData] = useState([]);

  const getUser = useQuery('users', () => makeGetRequest(crudApi()), {
    onSuccess: res => {
      setUserData(res);
    },
  });
  const addUserMutation = useMutation(
    data => makePostRequest(crudApi(), data),
    {
      onSuccess: res => {
        console.log('CRUD-->', res);
      },
    },
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: 'black',
          }}>
          UserTask APP
        </Text>
      </View>
      {getUser.isLoading ? (
        <ActivityIndicator
          size="large"
          color={'#AD3982'}
          style={styles.loader}
        />
      ) : userData.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: 10}}
          data={userData}
          renderItem={({item}) => (
            <UserCard
              userData={item}
              onEdit={() => {
                navigation.navigate('EditUser', {data: item});
              }}
            />
          )}
        />
      ) : (
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: '#AD3982',
            alignSelf: 'center',
          }}>
          NO Data
        </Text>
      )}

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddUser');
          }}>
          <View style={styles.iconContainer}>
            <CustomIcon Icon={Add} size={24} color={'#FFFFFF'} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  footer: {
    position: 'absolute',
    justifyContent: 'flex-end',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: '#339CFF',
    elevation: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loader: {flex: 1, justifyContent: 'center'},
});
export default UserListScreen;
