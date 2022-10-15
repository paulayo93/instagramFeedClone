import React, { useEffect, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ImageBackground,
  Image
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
import color from './../constants/colors'

const Header = (props) => {
  return (
    <View>
      <Image source={story} style={{ width: 375, height: 105}} />
    </View>
  );
};

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { data, error, isLoading } =
    productApi.endpoints.getAllProducts.useQuery();

  const getProductsStore = useSelector((state) => state.product);

  return (
    <AppContainer light={false} backgroundColor={color.backgroundColor} padded={false} scroll={false}>
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
            justifyContent: "space-between",
            paddingRight: 5
          }}
        >
          <TouchableWithoutFeedback onPress={() => null}>
          <Explore />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => null}>
          <Like />
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={() => console.log('Yeah')}>
          <Messenger />
          </TouchableWithoutFeedback>
        
       
         
        </View>
      </View>
      <FlashList
        ListHeaderComponent={<Header />}
        data={data}
        estimatedItemSize={200}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <Text style={{ color: "black" }}>Here</Text>
            </View>
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
