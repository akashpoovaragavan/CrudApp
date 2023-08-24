import {useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useMutation, useQueryClient} from 'react-query';
import {crudApi} from '../api/url';
import {RadioGroup} from 'react-native-radio-buttons-group';
import makePutRequest from '../utils/makePutRequest';

const EditUserScreen = ({navigation, route}) => {
  const propsData = route?.params?.data;
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [radioIndex, setRadioIndex] = useState();
  const queryClient = useQueryClient();
  const radioButtons = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Male',
        value: 'Male',
      },
      {
        id: '2',
        label: 'Female',
        value: 'Female',
      },
      {
        id: '3',
        label: 'Others',
        value: 'Others',
      },
    ],
    [],
  );
  const updateUserMutation = useMutation(
    data => makePutRequest(crudApi({id: propsData?._id}), data),
    {
      onSuccess: res => {
        console.log('Update-->', res);
        queryClient.invalidateQueries('users');
        navigation.pop();
      },
    },
  );
  const handleOnUpdate = () => {
    updateUserMutation.mutate({
      name: name,
      email: email,
      mobile: mobile,
      gender: gender,
    });
  };
  useEffect(() => {
    if (route?.params?.data) {
      setName(propsData?.name);
      setEmail(propsData?.email);
      setMobile(propsData?.mobile);
      if (propsData?.gender == 'Male') {
        setRadioIndex(1);
      } else if (propsData?.gender == 'Female') {
        setRadioIndex(2);
      } else {
        setRadioIndex(3);
      }
    }
  }, [propsData]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: 'black',
          }}>
          Update User Details
        </Text>
      </View>
      <Text style={styles.textStyle}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.textStyle}>Mobile Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="numeric"
      />
      <Text style={styles.textStyle}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={styles.textStyle}>Gender</Text>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={val => {
          if (val == 1) {
            setGender('Male');
          } else if (val == 2) {
            setGender('Female');
          } else {
            setGender('Others');
          }
          setRadioIndex(val);
        }}
        selectedId={radioIndex}
        containerStyle={{alignItems: 'flex-start'}}
      />
      <TouchableOpacity style={styles.button} onPress={handleOnUpdate}>
        <Text style={styles.buttonText}>{'Update'}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    bottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
export default EditUserScreen;
