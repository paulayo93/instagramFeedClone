import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { productApi } from "./../redux-store/product.effects";
import { addFavorite, removeFavorite } from "./../redux-store/product.reducers";
import AppContainer from "./../components/app-container";
import { FlashList } from "@shopify/flash-list";

import Content from "./partials/content";
import ContentHeader from "./partials/content-header";
import Header from "./partials/header";

import heartActive from "./../assets/images/heart-active.png";
import heartIcon from "./../assets/images/heart-icon.png";
import comment from "./../assets/images/comment.png";
import share from "./../assets/images/share.png";
import Logo from "./../assets/icons/logo";
import Explore from "./../assets/icons/explore";
import Messenger from "./../assets/icons/spike";
import color from "./../constants/colors";

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

  const onHeartClicked = (itemId, isFavorite) => {
    if (isFavorite) {
      removeItemFavorite(itemId, isFavorite);
    } else if (!isFavorite) {
      addItemFavorite(itemId);
    }
  };

  return (
    <AppContainer
      light={false}
      backgroundColor={color.backgroundColor}
      padded={false}
      scroll={false}
    >
      <View style={styles.topHeader}>
        <View style={{ width: 104, height: 30 }}>
          <Logo />
        </View>

        <View style={styles.iconSection}>
          <TouchableOpacity style={{ marginRight: 23 }} onPress={() => null}>
            <Explore />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => null}>
            <Messenger />
          </TouchableOpacity>
        </View>
      </View>

      <FlashList
        ListHeaderComponent={<Header />}
        data={productArr || productInStore.products}
        estimatedItemSize={100}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <>
              <View style={{ marginBottom: 40 }}>
                <ContentHeader />

                <Content
                  key={index}
                  image={item.image}
                  navigation={navigation}
                  id={item.id}
                  addItemToFavorite={addItemFavorite}
                />

                <View style={styles.listItemFooter}>
                  <TouchableOpacity
                    onPress={() => onHeartClicked(item.id, item.isFavorite)}
                  >
                    <Image
                      style={[styles.listItemFooterImage, styles.gap]}
                      source={item.isFavorite ? heartActive : heartIcon}
                    />
                  </TouchableOpacity>
                  <Image
                    style={[styles.listItemFooterImage, styles.gap2]}
                    source={comment}
                  />
                  <Image style={styles.listItemFooterImage} source={share} />
                </View>
              </View>
            </>
          );
        }}
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  topHeader: {
    marginTop: 18,
    marginBottom: 3,
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconSection: {
    width: 112,
    height: 24,
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: 5,
  },
  listItemFooter: {
    padding: 8,
    paddingLeft: 16,
    flexDirection: "row",
  },
  listItemFooterImage: {
    width: 28,
    height: 28,
  },
  gap: {
    marginRight: 12,
  },
  gap2: {
    marginRight: 8,
  },
});
