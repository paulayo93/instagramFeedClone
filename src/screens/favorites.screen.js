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
import { addFavorite, removeFavorite } from "./../redux-store/product.reducers";

import AppContainer from "./../components/app-container";
import { FlashList } from "@shopify/flash-list";
import Logo from "./../assets/icons/logo";
import Explore from "./../assets/icons/explore";
import Like from "./../assets/icons/like";
import Messenger from "./../assets/icons/spike";
import story from "./../assets/images/stories.png";
import color from "./../constants/colors";

import woman from "./../assets/images/woman.png";

import ContentHeader from "./partials/content-header";
import Content from "./partials/content";

export default function FavoritesScreen({ navigation }) {
  const dispatch = useDispatch();

  const storedFavorites = useSelector((state) =>
    state?.product?.products?.filter((obj) => obj?.isFavorite)
  );

  const addItemFavorite = (itemId) => {
    dispatch(addFavorite({ itemId }));
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

      {storedFavorites.length <= 0 ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={woman} style={{ marginTop: 40 }} />
          <View style={styles.emptyText}>
            <Text style={{ fontWeight: "bold", fontSize: 28 }}>
              You don’t have favorites
            </Text>
          </View>
        </View>
      ) : (
        <FlashList
          data={storedFavorites}
          estimatedItemSize={200}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <>
                <View style={{ marginTop: 10 }}>
                  <ContentHeader />
                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigation.navigate("Detail", { product: item })
                    }
                  >
                    <View>
                      <Content
                        image={item.image}
                        key={index}
                        navigation={navigation}
                        id={item.id}
                        addItemToFavorite={addItemFavorite}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </>
            );
          }}
        />
      )}
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
  },
  topHeader: {
    marginTop: 18,
    marginBottom: 3,
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emptyText: {
    minHeight: 200,
    width: "100%",
    marginTop: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  iconSection: {
    width: 112,
    height: 24,
    flexDirection: "row",
    justifyContent: "center",
    paddingRight: 5,
  },
});
