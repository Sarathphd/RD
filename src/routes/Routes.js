import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// my screens
import SplashScreen from './../components/splashScreen/SplashScreen';
import Login from './../components/login/LoginScreen';
import Home from './../components/home/Home';
import TwoTabs from './../components/twoTabs/TwoTabs';

const navOptionHandler = () => ({
    headerShown: false
})

const headerConfig = {
    headerStyle: {
        backgroundColor: 'red',
        // height: 40 
    },
    headerTintColor: '#fff',
    headerTitleAlign: 'center',
    headerTitleStyle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
}

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="splashScreen">
                <Stack.Screen name="splashScreen" component={SplashScreen} options={navOptionHandler} />
                <Stack.Screen name="login" component={Login} options={navOptionHandler} />
                <Stack.Screen name="home" component={Home} options={navOptionHandler} />
                <Stack.Screen name="twotabs" component={TwoTabs} options={navOptionHandler} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes

const styles = StyleSheet.create({})
