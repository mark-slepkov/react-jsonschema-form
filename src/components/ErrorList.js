import React from "react";
import { View, Text } from 'react-native'


export default class ErrorList extends React.Component {
    render() {
        const {errors} = this.props;
        return (
            <View>
                <Text style={{color: "#ff0000"}}>Errors</Text>
                <View style={{color: "#ff6666"}}>
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