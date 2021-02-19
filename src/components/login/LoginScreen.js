import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Keyboard } from 'react-native';
import { Content } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
// my custom components
import InputField from './../../common/inputField/InputField';
import { ToastMsg } from './../../common/toastMsg/ToastMsg';
import CustomButton from './../../common/customButton/CustomButton';

var users = [{
    "id": "1",
    "username": "aman",
    "password": "aman123"
},
{
    "id": "2",
    "username": "sarath",
    "password": "sarath123"
},
{
    "id": "3",
    "username": "sasha",
    "password": "sasha123"
}];

const initialState = {
    username: '',
    password: ''
}

const initialErrorState = {
    username: true,
    password: true
}

const LoginScreen = ({ navigation }) => {

    const [loginForm, setLoginForm] = useState(initialState);

    const [error, setError] = useState(initialErrorState);

    const [userData, setUserData] = useState([]);


    const onChange = (name, value, err) => {
        setLoginForm({
            ...loginForm,
            [name]: value
        });

        setError({
            ...error,
            [name]: err
        })
    }

 
    const onSubmit = (e) => {
        Keyboard.dismiss();
        e.preventDefault();
        navigation.navigate('home');
          if(loginForm.username != null){
            if(users.some(person => person.username === loginForm.username.toLowerCase())){
               const data = users.find(person => person.username === loginForm.username.toLowerCase()); 
               AsyncStorage.setItem('users', JSON.stringify(data));
                navigation.navigate('home');
            } else{
                ToastMsg('Please enter correct username password ');
                navigation.navigate('login');
            }
          }  


        setLoginForm({
            username: '',
            password: ''
        })
    }

    const onDisable = (ers) => {
        const value = Object.keys(ers).some(val => ers[val] === true);
        return value;
    }


    return (
        <View style={styles.container}>
            
            <View style={styles.imageContainer}>
                <Image source={require('./../../assets/png/rd.png')} style={styles.logo} />
            </View>
            <Content>
                <View style={{width: '100%', padding: 10 }}>
                    <InputField
                        label="Username"
                        name="username"
                        validate={['required', 'required']}
                        placeholder="Username"
                        returnKeyType="next"
                        value={loginForm.username}
                        onChangeText={(name, value, err) => onChange(name, value, err)}
                    />
                    <InputField
                        label="Password"
                        name="password"
                        value={loginForm.password}
                        validate={['required', 'required']}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={(name, value, err) => onChange(name, value, err)}
                    />
                    <CustomButton
                        title="Login"
                        disabled={onDisable(error)}
                        onPress={e => onSubmit(e)}
                    />
                </View>
            </Content>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#464646',
    },
    imageContainer: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 50,
        borderRadius: 1000,
    },
    loginButton: {
        width: '100%',
        height: 45,
        backgroundColor: '#DF2E2E',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    loginText: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    }
})
