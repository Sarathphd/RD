import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'
import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Stars from 'react-native-stars';
import Icon from './../../../common/icon/Icon';

const Home = ({ navigation }) => {
   
    const [value, setValue] = useState('');

    const [dishData, setDishData] = useState([])

    useEffect(() => {
        getData();
    }, [getData])

    const getData= async() => {
            const dishesData = await AsyncStorage.getItem('dishes');
            setDishData(dishesData);
            console.log(dishesData);
    }

  
    return (
        <View style={{flex:1}}>
            <View style={styles.MainContainer}>
                <FlatList
                    data={dishData}
                    renderItem={({ item }) =>
                        <View style={styles.GridViewBlockStyle}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={{uri: item.image}} style={{ width: '100%', height: 150, marginBottom: 10, borderRadius: 10}} />
                                <View style={{flexDirection: 'row', width: '90%', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Text style={styles.GridViewInsideTextItemStyle}>{item.dishname}</Text>
                                    <Stars 
                                    half={true}
                                    default={0.1}
                                    update={(val)=>{setValue({stars: val})}}
                                    spacing={4}
                                    starSize={100}
                                    count={5}
                                    
                                    fullStar={<Icon name="star"  color="green" size={25}/>}
                                    emptyStar={<Icon name="star-o" color="yellow" size={25}/>}
                                    halfStar={<Icon name="star-half-empty"  color="green" size={25} />}
                                    />
                                </View> 
                            </View>
                        </View>}
                    numColumns={1}
                />
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        padding: 5,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 10
    },
    GridViewBlockStyle: {
        borderRadius: 10,
        flex: 1,
        height: 200,
        margin: 5,
        backgroundColor: '#ccc',
    },
    GridViewInsideTextItemStyle: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        justifyContent: 'center',
    },
})

