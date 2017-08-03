import React from "react";
import { View, Text, StyleSheet } from 'react-native'


export default class ErrorList extends React.Component {
    render() {
        const {errors} = this.props;
        return (
            <View>
                <Text style={{color: "#ff0000"}}>Errors</Text>
                <View>
                    {errors.map((error, i) => {
                        return (
                            <Text style={{color: "#ff6666"}} key={i}>
                                {error.stack}
                            </Text>
                        );
                    })}
                </View>
            </View>
        );
    }
}