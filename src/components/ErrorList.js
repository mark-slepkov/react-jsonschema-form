import React from "react";
import { View, Text } from 'react-native'


export default class ErrorList extends React.Component {
    render() {
        const {errors} = this.props;
        return (
            <View>
                <Text>Errors</Text>
                <View>
                    {errors.map((error, i) => {
                        return (
                            <Text key={i}>
                                {error.stack}
                            </Text>
                        );
                    })}
                </View>
            </View>
        );
    }
}