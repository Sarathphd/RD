import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image } from 'react-native';
import Stars from 'react-native-stars';
import CustomHeader from './../../common/customHeader/CustomHeader';
import CustomButton from './../../common/customButton/CustomButton';
import Icon from './../../common/icon/Icon';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Home = ({ navigation }) => {
    const [state, setState] = useState([]);

    useEffect(() => {
        getData();
    }, [getData]);

    const getData= async() => {
        const dishesData = await AsyncStorage.getItem('dishes');
        setState(dishesData);
}
    return (
        <SafeAreaView style={{flex:1}}>
            <CustomHeader title="Home" isHome={false} navigation={navigation} />
            <View style={styles.MainContainer}>
                <FlatList
                    data={state}
                    renderItem={({ item }) =>
                        <View style={styles.GridViewBlockStyle}>
                            <View style={ styles.inContaine}r>
                                <Image source={{uri: item.image}} style={styles.image} />
                                <View style={{flexDirection: 'column', width: '90%', justifyContent: 'flex-start'}}>
                                    <Text style={styles.GridViewInsideTextItemStyle}>{item.dishname}</Text>
                                    <Text style={styles.GridViewInsideTextItemStyleStar}>{item.desc}</Text>
                                    <Stars 
                                    half={true}
                                    default={5}
                                    spacing={4}
                                    starSize={100}
                                    count={5}
                                    
                                    fullStar={<Icon name="star"  color="green" size={20}/>}
                                    emptyStar={<Icon name="star-o" color="yellow" size={20}/>}
                                    halfStar={<Icon name="star-half-empty"  color="green" size={20} />}
                                    />
                                </View> 
                            </View>
                        </View>}
                    numColumns={1}
                />
                <CustomButton
		            fab
		            iconName='plus'
                    size={20}
		            onPress={() => navigation.navigate('twotabs')}
		        />
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        padding: 5,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 10,
        backgroundColor: '#464646'
    },
    GridViewBlockStyle: {
        borderRadius: 10,
        flex: 1,
        height: 250,
        margin: 5,
        backgroundColor: '#ccc',
    },
    GridViewInsideTextItemStyle: {
        color: '#000',
        fontSize: 16,
        fontWeight: '700',
        justifyContent: 'center',
    },
    GridViewInsideTextItemStyleStar: {
        color: '#403E3E',
        fontSize: 14,
    },
    inContainer: {
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    image: {
        width: '100%',
         height: 170, 
         marginBottom: 5,
          borderTopLeftRadius:10,
           borderTopRightRadius: 10
    }
})
