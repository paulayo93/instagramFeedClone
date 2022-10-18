import React, { useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Platform,
} from "react-native";

import { TapGestureHandler } from "react-native-gesture-handler";
import DoubleTap from './../../components/tap'


import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

import heart from "./../../assets/images/heart.png";

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default Content = (props) => {
  const { image, id, addItemToFavorite, navigation } = props;
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const doubleTapRef = useRef();

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
  }));

  const onDoubleTap = useCallback(() => {
    addItemToFavorite(id);
    // removeItemFavorite(item.id, item?.isFavorite)

    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, []);

  const navigatePage = () => {
    runOnJS(navigation.navigate)("Detail", { product: { id, image } });
  };

  const onSingleTap = useCallback(() => {
    navigatePage();
    opacity.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) {
        opacity.value = withDelay(500, withTiming(1));
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {Platform.OS === "android" ? (
        <DoubleTap
          singleTap={() => {
            onSingleTap();
          }}
          doubleTap={() => {
            onDoubleTap();
          }}
          delay={200}
        >
          <Animated.View>
            <ImageBackground
              style={styles.productImage}
              source={{
                uri: image,
              }}
              resizeMode="contain"
            >
              <AnimatedImage
                source={heart}
                style={[styles.heart, rStyle]}
                resizeMode={"center"}
              />
            </ImageBackground>
          </Animated.View>
        </DoubleTap>
      ) : (
        <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
          <TapGestureHandler
            maxDelayMs={250}
            ref={doubleTapRef}
            numberOfTaps={2}
            onActivated={onDoubleTap}
          >
            <Animated.View>
              <ImageBackground
                style={styles.productImage}
                source={{
                  uri: image,
                }}
                resizeMode="contain"
              >
                <AnimatedImage
                  source={heart}
                  style={[styles.heart, rStyle]}
                  resizeMode={"center"}
                />
              </ImageBackground>
            </Animated.View>
          </TapGestureHandler>
        </TapGestureHandler>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, minHeight: 400 },
  heart: {
    width: 100,
    height: 100,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.35,
    shadowRadius: 35,
  },
  productImage: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
