import  COLORS  from './../constants/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default AppContainer = ({
    children, light, backgroundColor, padded = true, scroll = true,
    isOtp = false,
}) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                flex: 1,
                paddingTop: insets.top,
                paddingLeft: insets.left + padded ? 16 : 0,
                paddingRight: insets.right + padded ? 16 : 0,
                paddingBottom: padded ? insets.bottom + 6 : 0,
                backgroundColor: backgroundColor || COLORS.WHITE
            }}>
            <StatusBar barStyle={light ? 'light-content' : 'dark-content'} />

            <View style={appContainerStyles.content}>
                {scroll ? (
                    <KeyboardAwareScrollView
                        contentContainerStyle={appContainerStyles.contentContainerStyle}
                        style={appContainerStyles.container}
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={1}
                        keyboardShouldPersistTaps={isOtp ? "handled" : undefined}
                    >
                        {children}
                    </KeyboardAwareScrollView>
                ) : (
                    <>
                        {children}
                    </>
                )}
            </View>
        </View>
    );
};

const appContainerStyles = StyleSheet.create({
    contentContainerStyle: {
        flexGrow: 1,
    },
    container: {
        height: '100%',
        flex: 1,
        backgroundColor: 'transparent',
    },
    content: {
        flex: 1,
        width: '100%',
    }
});