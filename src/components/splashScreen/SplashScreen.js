import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet,
    Image,
    Text
} from 'react-native';


const SplashScreen = ({ navigation }) => {

    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
            navigation.navigate('login');
        }, 5000);
    }, []);


    return (
        <View style={styles.container}>

            <Text style={styles.ranking}>Ranking</Text>

            <Text style={styles.dishes}>Dishes</Text>

            <ActivityIndicator
                animating={animating}
                color="#fff"
                size="large"
                style={styles.activityIndicator}
            />

        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#464646',
    },
    ranking: {
        color: 'red',
        fontSize: 40,
        fontWeight: 'bold'
    },
    dishes: {
        color: 'green', 
        fontSize: 40, 
        fontWeight: 'bold'
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});
