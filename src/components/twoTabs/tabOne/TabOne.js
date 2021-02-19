import { Content } from 'native-base';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Keyboard } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import InputField from './../../../common/inputField/InputField';
import CustomButton from './../../../common/customButton/CustomButton';
import Icon from './../../../common/icon/Icon';
import ToastMsg from './../../../common/toastMsg/ToastMsg';



const initialState = {
    dishId: Math.random(),
    foodName: '',
    description: '',
    userId: '',
    image: ''
}

const initialErrorState = {
    foodName: true,
    description: true,
}


const TabOne = () => {

    const [form, setForm] = useState(initialState);

    const [imageData, setImageData] = useState({});

    const [error, setError] = useState(initialErrorState);

    const [data, setData] = useState([]);

    const onChange = (name, value, err) => {
        setForm({
            ...form,
            [name]: value
        });

        setError({
            ...error,
            [name]: err
        })
    }

    const onSubmit = async (e) => {
        Keyboard.dismiss();
        e.preventDefault();

        await AsyncStorage.getItem('users').then((value) => {
            const data = JSON.parse(value);
            setForm({ userId: data.id });
        })

        const storedData = await AsyncStorage.getItem('dishes');
        const storedDataParsed = JSON.parse(storedData);
    
        setData(storedDataParsed)
        const arr = [];
        let newData = [];
        arr.push(form);
        if (storedData === null) {
        await AsyncStorage.setItem('dishes', JSON.stringify(arr));
        } else {
            newData = [...storedDataParsed, form];
          await AsyncStorage.setItem('dishes', JSON.stringify(newData));
        }
    }

    const pickSingleWithCamera = (cropping, mediaType = 'photo') => {
        setImageData('');
        ImagePicker.openCamera({
            cropping: cropping,
            width: 500,
            height: 500,
            includeExif: true,
            mediaType,
        })
            .then((image) => {
                setImageData({
                    uri: image.path || image.uri,
                    type: image.mime || image.type,
                    fileName: image.path && image.path.split('/').pop() || image.filename,
                    width: image.width,
                    height: image.height
                });
                setForm({
                    image: imageData.uri
                })
            })
            .catch((e) => alert(e));
    }

    const onDisable = (ers) => {
        const value = Object.keys(ers).some(val => ers[val] === true);
        return value;
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#464646', padding: 10 }}>
            <Content>
                <View style={{ width: '100%', backgroundColor: '#747474', height: 200, borderRadius: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                    {
                        imageData.uri ?
                            <ImageBackground source={{ uri: imageData.uri }} style={{ width: '100%', height: 200, borderRadius: 10, opacity: 0.6, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => pickSingleWithCamera()} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Capture</Text>
                                    <Icon name="camera" size={30} color="#000" />
                                </TouchableOpacity>
                            </ImageBackground>
                            :
                            <TouchableOpacity onPress={() => pickSingleWithCamera()} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Capture</Text>
                                <Icon name="camera" size={30} color="#000" />
                            </TouchableOpacity>
                    }

                </View>

                <InputField
                    label="Food Name"
                    name="foodName"
                    placeholder="Enter food name"
                    value={form.foodName}
                    validate={['required', 'required']}
                    onChangeText={(name, value, err) => onChange(name, value, err)}
                />

                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter description"
                    value={form.description}
                    validate={['required', 'required']}
                    onChangeText={(name, value, err) => onChange(name, value, err)}
                />

                <CustomButton
                    title="Submit"
                    disabled={onDisable(error)}
                    onPress={e => onSubmit(e)}
                />
            </Content>
        </View>
    )
}

export default TabOne

const styles = StyleSheet.create({})
