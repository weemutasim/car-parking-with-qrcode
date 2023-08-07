import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getFirestore } from 'firebase/firestore';

const Regis = ({ navigation }) => {
    const [ShowPassword, setShowPassword] = useState(true);
    const [name, setName] = useState('');
    const [surename, setSurename] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const RegisterUser = () => {
        const auth = getAuth();
        const db = getFirestore();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigation.navigate('Operation_Screen');
            Alert.alert('Registration Successful');
            console.log(`User with email ${user.email} has been registered.`);

            const docRef = addDoc(collection(db, "users"), {
                name: name,
                lastname: surename,
                username: userName,
                email: email,
                password: password
            });
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((e) => {
            console.log(e.message);
            console.log(error.code);
            Alert.alert('Registration Failed');
        })
    }

  return (
    <View style={{height: '100%', paddingTop: 100, backgroundColor: 'white'}}>
      <Text style={{fontSize: 24, color: 'black', marginHorizontal: 50, fontWeight: 'bold'}}>Get Started</Text>
      <Text style={{fontSize: 13, marginHorizontal: 50, paddingBottom: 40}}>Let's create your account!</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder='Name'
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setSurename(text)}
        value={surename}
        placeholder='Surename'
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder='Email'
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setUserName(text)}
        value={userName}
        placeholder='User Name'
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => {setPassword(text)}}
        value={password}
        placeholder='Password'
        secureTextEntry={ShowPassword}
      />
      <View style={{alignItems: 'center', paddingTop: 40}}>
        <TouchableOpacity onPress={RegisterUser}
            style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: 5}}>
        <Text style={{fontSize: 14, color: '#000000'}}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{fontSize: 14, color: '#000000', fontWeight: 'bold'}}> Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 0.5,
        padding: 15,
        fontSize: 16,
        marginTop: 20,
        borderRadius: 50,
        marginHorizontal: 30
    },
    eye: {
        position: 'absolute', 
        right: 50, 
        paddingTop: 540
    },
    button: {
        backgroundColor: '#097AFF',
        paddingVertical: 20,
        width: '80%',
        borderRadius: 15
    },
    buttonText: {
        fontSize: 16,
        marginHorizontal: 30,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    }
  })

export default Regis