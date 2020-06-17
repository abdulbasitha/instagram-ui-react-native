/* Creator   : ABDUL BASITH A */
/* Email     : ambalavanbasith@gmail.com */
/* github    : abdulbasitha */
/* More Info : https://techzia.in */
import React, { Component } from "react";
import {

    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator
} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign'
import Block from '../components/Block';
import Text from '../components/Text';
import { theme } from "../constants";
import { block } from "react-native-reanimated";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Comments extends Component {
    state = {
        data: [],
        isLoading:true
    }
    componentDidMount() {
        fetch('https://cookbookrecipes.in/test.php')
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
                this.setState({
                    isLoading: false
                })
            });
    }
    renderComments = () => {

        return (
            <Block>
                {this.state.data.map(data =>
                    <Block flex={false} style={styles.userDescription}>
                        <Block color="white" flex={false} style={styles.commentHead}>
                            <Block
                                middle
                                center
                                row space="between"
                                style={styles.feedHead}
                            >
                                <Block row style={styles.commentHead}>
                                    <Image
                                        style={{ width: 35, height: 35 }}
                                        source={require('../assets/icons/profile.png')}
                                    />
                                    <Block flex={1} middle padding={[0, theme.sizes.base - 5]}>
                                        <Text><Text h4 bold>{data.username}</Text>
                                            <Text h4 > {data.comments} </Text>
                                        </Text>
                                        <Block marginTop={10} row >
                                            <Block style={styles.commentFooter} flex={false}><Text gray2>13h</Text></Block>
                                            <Block style={styles.commentFooter} flex={false}><Text gray2>10 like</Text></Block>
                                            <Block style={styles.commentFooter} flex={false}><Text gray2>Replay</Text></Block>
                                        </Block>

                                    </Block>
                                    <Block flex={false} center middle>
                                        <TouchableOpacity onPress={this.onPress}>
                                            <Icon
                                                name='hearto'
                                                size={15}
                                                color={theme.colors.gray1}
                                                ref={this.onRef} />
                                        </TouchableOpacity>
                                    </Block>

                                </Block>



                            </Block>
                        </Block>

                    </Block>
                )}
            </Block>

        )
    }
    render() {
        return (
            <Block >
                {this.state.isLoading == false ? (
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}
                        contentInsetAdjustmentBehavior="automatic"
                    >
                        <Block flex={false} style={styles.userDescription}>
                            <Block color="white" flex={false} style={styles.commentHead}>
                                <Block
                                    middle
                                    center
                                    row space="between"
                                    style={styles.feedHead}
                                >
                                    <Block row style={styles.commentHead}>
                                        <Image
                                            style={{ width: 35, height: 35 }}
                                            source={require('../assets/icons/profile.png')}
                                        />
                                        <Block flex={1} middle padding={[0, theme.sizes.base - 5]}>
                                            <Text><Text h4 bold>abdulbasitha</Text>
                                                <Text h4 > {this.props.navigation.state.params.description} </Text>
                                            </Text>
                                        </Block>

                                    </Block>



                                </Block>
                            </Block>



                        </Block>
                        {this.renderComments()}

                    </ScrollView>
                ) : (<Block center middle>
                    <ActivityIndicator color={theme.colors.gray2} />
                </Block>)}

            </Block>
        );
    }
}
export default Comments;

const styles = StyleSheet.create({
    feedHead: {
        marginTop: theme.sizes.base,
        marginHorizontal: theme.sizes.base,

    },
    commentHead: {

        paddingBottom: theme.sizes.base - 10,

    },
    userDescription: {
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    commentFooter: {
        marginHorizontal: theme.sizes.base
    }
});