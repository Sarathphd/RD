import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { Content, Tab, Tabs, ScrollableTab, Container } from 'native-base';
import CustomHeader from './../../common/customHeader/CustomHeader';
import TabOne from './tabOne/TabOne';
import TabTwo from './tabTwo/TabTwo';

const TwoTabs = ({navigation}) => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <CustomHeader title="Foods" isHome={false} navigation={navigation} />
            <Container>
                    <Tabs renderTabBar={() => <ScrollableTab />} locked style={{backgroundColor: '#fff'}}> 
                        <Tab heading="Add Food">
                            <TabOne  navigation={navigation}/>
                        </Tab>
                        <Tab heading="Select Three Food">
                            <TabTwo navigation={navigation} />
                        </Tab>
                    </Tabs>
                </Container>
        </SafeAreaView>
    )
}

export default TwoTabs

const styles = StyleSheet.create({})
