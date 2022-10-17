import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { productApi } from "./../redux-store/product.effects";
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

const ContentHeader = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 10,
        marginBottom: 3
      }}
    >
      <Avatar />
      <Option />
    </View>
  );
};

const Content = ({ image, video, type, title }) => {
  return (
    <View style={{flex: 1, height: 400}}>
      <Image
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "absolute",
        // aspectRatio: 1
      }}
        source={{
          uri: image,
        }}

        resizeMode="contain"
      />

    </View>
  );
};

export default function FavoritesScreen({navigation}) {
  const [favorites, setFavorites] = useState([]);
  const dispatch = useDispatch();
  const { data, error, isLoading } =
    productApi.endpoints.getAllProducts.useQuery();
    const storedFavorites = useSelector((state) => state?.product?.products?.filter((obj) => obj?.isFavorite));

  // console.log(getStoredFavorites)

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

      </View>

      <FlashList
        data={storedFavorites}
        estimatedItemSize={200}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          // console.log(item.image)
          return (
            <>
              <View style={{marginTop: 10}}>

            
                <ContentHeader />
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Detail', {product: item})}>
                  <View>
                  <Content image={item.image} />

                  </View>
              
                </TouchableWithoutFeedback>
               
                </View>
           
            </>
          );
        }}
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
  },
});
