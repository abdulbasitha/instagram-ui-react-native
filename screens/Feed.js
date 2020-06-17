/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Image, TouchableOpacity, Dimensions,
    FlatList,
    Animated,
    ActivityIndicator,
    AsyncStorage,
    Alert
} from "react-native";
import * as mocks from '../constants/mocks';
import Block from '../components/Block';
import Text from '../components/Text';
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialIcons'
import ReadMore from 'react-native-read-more-text';
import { theme } from "../constants";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Feed extends Component {
    scrollX = new Animated.Value(0)
    state = {
        data: [],
        isLoading: true,
        newid: null

    }
    componentDidMount() {
        fetch('https://hiit.ria.rocks/videos_api/cdn/com.rstream.crafts?versionCode=40&lurl=Canvas%20painting%20ideas')
            .then((response) => response.json())
            .then((responseJson) => {
                //  console.log(responseJson);
                this.setState({
                    data: responseJson,
                    isLoading: false
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    renderBottomNavigation = () => {
        return (

            <Block flex={false} space="around" row margin={5}>
                {mocks.BottomTabNavigatorIcons.map(e => (
                    <TouchableOpacity>

                        <Image
                            style={styles.icon}
                            source={e.icon}
                            resizeMode="contain"
                        />

                    </TouchableOpacity>
                ))
                }


            </Block>
        )

    }
    renderPostHeader = () => {
        return (
            <Block color="white" flex={false} >
                <Block
                    middle
                    center
                    height={theme.sizes.base * 3.5} row space="between"
                    style={styles.feedHead}
                >
                    <Block row>
                        <Image
                            style={{ width: 35, height: 35 }}
                            source={require('../assets/icons/profile.png')}
                        />
                        <Block middle padding={[0, theme.sizes.base - 5]}>
                            <Text h3 bold>abdulbasitha</Text>
                        </Block>
                    </Block>
                    <Block flex={false}>
                        <TouchableOpacity onPress={this.onPress}>
                            <Icon
                                name='more-vert'
                                size={20}
                                color={theme.colors.black}
                                ref={this.onRef} />
                        </TouchableOpacity>
                    </Block>

                </Block>
            </Block>
        )
    }
    renderPostFooter = (data) => {
        return (
            <Block flex={false} margin={[0, theme.sizes.base * 1.4]} color={theme.colors.white}>
                <Block flex={false}>
                    <Block >
                        <Text h4 bold>130 Likes </Text>
                    </Block>
                    <Block >
                        <Block flex={false} >
                            <ReadMore
                                numberOfLines={1}
                                renderTruncatedFooter={this._renderTruncatedFooter}
                                renderRevealedFooter={this._renderRevealedFooter}
                                onReady={this._handleTextReady}>
                                <Text><Text h4 bold>abdulbasitha</Text>
                                    <Text h4 > {data} </Text>
                                </Text>
                            </ReadMore>
                            <Block >
                                <TouchableOpacity
                                    onPress={() => (this.props.navigation.navigate('Comments', { description: data }))}>
                                    <Text bold gray2>View All Comments</Text>
                                </TouchableOpacity>
                            </Block>
                        </Block>

                    </Block>

                </Block>

            </Block>
        )
    }
    renderPostIcons = (data, id) => {
        return (
            <Block flex={false} color={theme.colors.white} row space="between" padding={[0, 10]}>
                <Block row flex={false}>
                    <TouchableOpacity>
                        <Image
                            style={styles.icon}
                            source={require('../assets/icons/Heart.png')}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => (this.props.navigation.navigate('Comments', { description: data }))}
                    >
                        <Image
                            style={styles.icon}
                            source={require('../assets/icons/Comment.png')}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity

                    >
                        <Image
                            style={styles.icon}
                            source={require('../assets/icons/message.png')}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </Block>
                <Block flex={false} style={{ marginRight: 70 }}>
                    {this.renderSteps()}
                </Block>
                <Block flex={false}>
                    <TouchableOpacity onPress={() => this.addToBookMark(id)}>
                        <Image
                            style={styles.icon}
                            source={require('../assets/icons/Bookmark.png')}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </Block>

            </Block>
        )
    }
    renderPosts = () => {
        this.state.data == undefined
        return (
            <Block flex={false}  >
                {this.state.data.map(data =>
                    <Block>
                        {this.renderPostHeader()}
                        <Block margin={[0, 0, theme.sizes.base]} >
                            <Block row>
                                <ScrollView horizontal
                                    showsHorizontalScrollIndicator={false}
                                    scrollEventThrottle={200}
                                    decelerationRate="fast"
                                    pagingEnabled
                                >
                                    <Image
                                        style={{ width: width, height: height / 1.8 }}
                                        source={{ uri: data["high thumbnail"] }}
                                    // source={require('../assets/images/post.jpg')}

                                    />
                                    <Image
                                        style={{ width: width, height: height / 1.8 }}
                                        source={{ uri: data["low thumbnail"] }}
                                    // source={require('../assets/images/post.jpg')}

                                    />
                                    <Image
                                        style={{ width: width, height: height / 1.8 }}
                                        source={{ uri: data["medium thumbnail"] }}
                                    // source={require('../assets/images/post.jpg')}

                                    />
                                </ScrollView>
                            </Block>


                            <Block>
                                {this.renderPostIcons(data['title'], data['id'])}
                            </Block>
                            {this.renderPostFooter(data['title'])}
                        </Block>
                    </Block>

                )}

            </Block>
        )


    }
    _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ color: theme.colors.gray1, marginTop: 5 }} onPress={handlePress}>
                Read more
            </Text>
        );
    }

    _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ color: theme.colors.gray1, marginTop: 5 }} onPress={handlePress}>
                Show less
            </Text>
        );
    }
    renderSteps = () => {
        const stepPosition = Animated.divide(this.scrollX, width)
        return (
            <Block row center middle
                middle style={styles.stepsContainer}>
                {[1, 2, 3].map((item, index) => {
                    const opacity = stepPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.4, 1, 0.4],
                        extrapolate: 'clamp'

                    })
                    return <Block
                        animated
                        color={theme.colors.gray1}
                        flex={false}
                        key={`step-${index}`}
                        style={[styles.steps, { opacity }]} />
                })}
            </Block>
        )
    }
    addToBookMark(newid) {
        this.setState({ newid: newid })
        AsyncStorage.getItem('savedIds', (err, result) => {
            const id = [this.state.newid];
            if (result !== null) {
                console.log('Data Found', result);

                var newIds = JSON.parse(result).concat(id);
                AsyncStorage.setItem('savedIds', JSON.stringify(newIds));
                Alert.alert("Post Id saved To  AsyncStorage", JSON.stringify(newIds))
            } else {
                console.log('Data Not Found');
                AsyncStorage.setItem('savedIds', JSON.stringify(id));
            }
        });

    }
    render() {
        return (

            <Block color={theme.colors.white}>
                {this.state.isLoading == false ? (
                    <Block>

                        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}
                            contentInsetAdjustmentBehavior="automatic"
                        >

                            <Block flex={false} >
                                {this.renderPosts()}
                            </Block>
                        </ScrollView>

                        <SafeAreaView>
                            <Block flex={false} style={styles.bottomNavigation} >

                                {this.renderBottomNavigation()}

                            </Block>
                        </SafeAreaView>
                    </Block>
                ) :
                    (<Block center middle>
                        <ActivityIndicator color={theme.colors.gray2} />
                    </Block>
                    )
                }

            </Block>





        );



    }
}
export default Feed;

const styles = StyleSheet.create({
    feedHead: {
        marginHorizontal: theme.sizes.base
    },
    PostHeader: {

    },
    bottomNavigation: {
        backgroundColor: theme.colors.white,
        borderTopColor: theme.colors.headerBottom,
        width: "100%",
        position: "absolute",
        height: height / 16,
        bottom: 1,

    },
    icon: {
        width: 25,
        height: 25,
        margin: 12
    },
    stepsContainer: {

    },
    steps: {
        width: 5,
        height: 5,
        borderRadius: 5,
        marginHorizontal: 2.5,

    }
});