import { View, Text, Alert } from 'react-native'
import React from 'react'
import { getAuth, signOut } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome'

const SettingsScreen = ({ navigation }) => {
    const logOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigation.navigate('Login')
            Alert.alert('Logout Successful');
            //console.log( `he user with the email ${user.email} has been logged out.`);
        })
        .catch((e) => {
            Alert.alert('Logout Failed');
            console.log(e.message);
            console.log(e.code);
        })
    }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 26, fontWeight: 'bold' }}>SettingsScreen</Text>
      <Icon style={{position: 'absolute', top: 15, right: 10, padding: 10,}}
      onPress={logOut} name="sign-out" size={40} color={'#BEBEBE'}></Icon>
    </View>
  )
}

export default SettingsScreen