// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

// Make a component
const Header = ( props ) => {
    const { textStyle, viewStyle } = styles;
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View >
    );
};

// Style the Component
const styles = {
    viewStyle: {
        backgroundColor: '#ff9f4f',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative',
    },
    textStyle: {
        fontSize: 30
    }
};

// Make the component available to toher parts of the app
export {Header};