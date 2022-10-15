import React, { useEffect, useMemo } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { productApi } from "./../redux-store/product.effects";
import AppContainer from "./../components/app-container";
import SvgComponent from './../assets/icons/logo';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { data, error, isLoading } =
    productApi.endpoints.getAllProducts.useQuery();

  const getProductsStore = useSelector((state) => state.product);

  return (
    <AppContainer>
      <View style={styles.container}>
      <SvgComponent/>
        <Text style={{ fontSize: 32, fontWeight: "100" }}>
          isLoading....., {isLoading}
        </Text>
       
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
