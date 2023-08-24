import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CustomIcon} from './customIcon';
import Delete from '@iconscout/react-native-unicons/icons/uil-trash-alt';
import Edit from '@iconscout/react-native-unicons/icons/uil-edit';
import {useMutation, useQueryClient} from 'react-query';
import makeDeleteRequest from '../utils/makeDeleteRequest';
import {crudApi} from '../api/url';

const UserCard = ({onEdit, userData}) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(id => makeDeleteRequest(crudApi(id)), {
    onSuccess: res => {
      console.log('Deleted');
      queryClient.invalidateQueries('users');
    },
  });
  const onDelete = id => {
    console.log(id);
    deleteMutation.mutate({id});
  };
  return (
    <View style={styles.item}>
      <View style={styles.square}></View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
        <Text style={{...styles.textStyle, fontWeight: 'bold', fontSize: 16}}>
          {userData?.name}
        </Text>
        <Text style={styles.textStyle}>{userData?.email}</Text>
        <Text style={styles.textStyle}>{userData?.gender}</Text>
        <Text style={styles.textStyle}>{userData?.mobile}</Text>
      </View>
      <View style={styles.itemLeft}>
        <TouchableOpacity
          style={{marginHorizontal: 20}}
          onPress={() => {
            onEdit();
          }}>
          <CustomIcon Icon={Edit} color="blue" size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(userData?._id)}>
          <CustomIcon Icon={Delete} color="red" size={26} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    elevation: 12,
  },
  itemLeft: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  textStyle: {
    color: '#000000',
  },
});

export default UserCard;
