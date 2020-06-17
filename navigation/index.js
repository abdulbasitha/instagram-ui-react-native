import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, ScrollView } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/AntDesign';
import {
    TouchableOpacity,
    StyleSheet,
    Text
} from "react-native";
import Feed from '../screens/Feed';
import Comments from '../screens/Comments';

import { theme } from '../constants';
import Block from '../components/Block';

const screens = createStackNavigator({
    Feed: {
        screen: Feed,
        navigationOptions: {
            headerTitle: (
                <Block middle center margin={[theme.sizes.base * .5, 0, 0, 0]}>
                    <Image
                        style={{ width: 200, height: 30 }}
                        source={require('../assets/logo/Instagram-Logo.png')}
                        resizeMode='contain'
                    />
                </Block>

            ),
            headerTitleStyle: { alignSelf: 'center' },
        }
    },
    Comments: {
        screen: Comments,
        navigationOptions: ({ navigate, navigation }) => ({
            headerLeft: (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Feed')}
                >
                    <Text
                        style={{ width: 200, height: 30 }}
                        resizeMode='contain'
                    >
                        <Icon name="arrowleft" size={30} color={theme.colors.black} />
                    </Text>
                </TouchableOpacity>

            )
        })

    }
}, {

    defaultNavigationOptions: {
        ...TransitionPresets.SlideFromRightIOS,
        headerStyle: {
            backgroundColor: theme.colors.white,
            borderBottomColor: theme.colors.headerBottom,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: StyleSheet.hairlineWidth,
        },
        headerLeft: (
            <TouchableOpacity>
                <Image
                    style={{ width: 25, height: 25 }}
                    source={require('../assets/icons/camera.png')}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity>
                <Image
                    style={{ width: 25, height: 25 }}
                    source={require('../assets/icons/message.png')}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        ),

        headerLeftContainerStyle: {

            marginLeft: theme.sizes.base,
            paddingRight: theme.sizes.base

        },
        headerRightContainerStyle: {

            paddingRight: theme.sizes.base
        },

    }
})


export default createAppContainer(screens);