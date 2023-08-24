import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import UserListScreen from '../screens/userListScreen';
import AddUserScreen from '../screens/addUserScreen';
import EditUserScreen from '../screens/editUserScreen';
const Stack = createNativeStackNavigator();
const ScreenNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={UserListScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="AddUser" component={AddUserScreen} />
        <Stack.Screen name="EditUser" component={EditUserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default ScreenNavigation;
