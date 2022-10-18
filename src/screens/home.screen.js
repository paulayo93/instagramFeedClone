import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { productApi } from "./../redux-store/product.effects";
import { addFavorite, removeFavorite } from "./../redux-store/product.reducers";
import AppContainer from "./../components/app-container";
import { FlashList } from "@shopify/flash-list";
import Logo from "./../assets/icons/logo";
import Explore from "./../assets/icons/explore";
import Like from "./../assets/icons/like";
import Messenger from "./../assets/icons/spike";
import story from "./../assets/images/stories.png";
import color from "./../constants/colors";

import dog from "./../assets/images/dog.png";
import Option from "./../assets/icons/option";

import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);

const Header = ({ image, title, status }) => {
  return (
    <View>
      <Image source={story} style={{ width: 375, height: 105 }} />
    </View>
  );
};

const Avatar = (props) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        style={{
          width: 30,
          height: 30,
          borderRadius: 30,
          borderWidth: 0,
          borderColor: "none",
          marginRight: 9,
        }}
        source={dog}
      />
      <Text
        style={{
          fontSize: 12,
          lineHeight: 22,
          fontWeight: "bold",
          color: "#000000",
        }}
      >
        Ruffles
      </Text>
    </View>
  );
};

const ContentHeader = ({ navigation }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 10,
        marginBottom: 3,
      }}
    >
      <Avatar />
      <Option />
    </View>
  );
};

const Content = ({ image, video, type, title, navigation, product }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);

  const doubleTapRef = useRef();

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
  }));

  const onDoubleTap = useCallback(() => {
    // runOnJS(navigation.navigate)("Detail", { product });
    // addItemFavorite(item.id)
    // removeItemFavorite(item.id, item?.isFavorite)

    scale.value = withSpring(1, undefined, (isFinished) => {
      if (isFinished) {
        scale.value = withDelay(500, withSpring(0));
      }
    });
  }, []);

  const navigatePage = () => {
    runOnJS(navigation.navigate)("Detail", { product });
  };

  const onSingleTap = useCallback(() => {
    console.log("run fucntion now");
    // navigatePage();
    // navigation.navigate("Detail", { product });

    opacity.value = withTiming(0, undefined, (isFinished) => {
      if (isFinished) {
        opacity.value = withDelay(500, withTiming(1));
      }
    });
  }, []);

  return (
    <View style={{ flex: 1, minHeight: 400 }}>
      <TapGestureHandler waitFor={doubleTapRef} onActivated={onSingleTap}>
        <Animated.View>

        <TapGestureHandler
          maxDelayMs={250}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={onDoubleTap}
        >
          <View>

      
          <Animated.View>
            <View>

         
            <ImageBackground
              style={{
                aspectRatio: 1,
              }}
              source={{
                uri: image,
              }}
              resizeMode="contain"
            >
            
              <AnimatedImage
                source={require("./../assets/images/heart.png")}
                style={[
                  styles.image,
                  {
                    shadowOffset: { width: 0, height: 20 },
                    shadowOpacity: 0.35,
                    shadowRadius: 35,
                  },
                  rStyle,
                ]}
                resizeMode={"center"}
              />
          
            </ImageBackground>
            </View>
          

          </Animated.View>
          </View>
        </TapGestureHandler>
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};

export default function HomeScreen({ navigation }) {
  const [productArr, setProductArr] = useState([]);
  const dispatch = useDispatch();
  const { data, error, isLoading } =
    productApi.endpoints.getAllProducts.useQuery();

  const productInStore = useSelector((state) => state.product);

  useEffect(() => {
    if (productInStore?.products?.length <= 0) {
      setProductArr(data);
    } else if (productInStore?.products?.length > 0) {
      setProductArr(productInStore?.products);
    }
  }, [productInStore.products]);

  const addItemFavorite = (itemId) => {
    dispatch(addFavorite({ itemId }));
  };

  const removeItemFavorite = (itemId, isFavorite) => {
    dispatch(removeFavorite({ itemId, isFavorite }));
  };

  return (
    <AppContainer
      light={false}
      backgroundColor={color.backgroundColor}
      padded={false}
      scroll={false}
    >
      <View
        style={{
          marginTop: 18,
          marginBottom: 3,
          paddingHorizontal: 20,
          paddingBottom: 16,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: 104, height: 30 }}>
          <Logo />
        </View>

        <View
          style={{
            width: 112,
            height: 24,
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingRight: 5,
          }}
        >
          {/* <TouchableWithoutFeedback onPress={() => null}>
            <Explore />
          </TouchableWithoutFeedback> */}

          <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
            <View>
              <Like />
            </View>
          </TouchableOpacity>

          {/* <TouchableWithoutFeedback onPress={() => null}>
            <Messenger />
          </TouchableWithoutFeedback> */}
        </View>
      </View>

      <FlashList
        ListHeaderComponent={<Header />}
        data={productArr || productInStore.products}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <>
              <View style={{ marginBottom: 40 }}>
                <ContentHeader />
                <View>
                  <Content
                    image={item.image}
                    navigation={navigation}
                    product={item}
                  />
                </View>
              </View>
            </>
          );
        }}
      />
    </AppContainer>
  );
}

const { width: SIZE } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
  },
  image: {
    width: SIZE,
    height: SIZE,
  },
});
