import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAllProducts, IProduct } from "../api/products";
import ProductItem from "../components/ProductItem";

const ProductsScreen = () => {
  const [state, setState] = useState<{
    products: IProduct[];
    isLoading: boolean;
    isRefreshing?: boolean;
  }>({ products: [], isLoading: false, isRefreshing: false });
   const fetchData = async () => {
      setState((prev) => ({ ...prev, isLoading: true }));
      const data = await getAllProducts();
      setState({ products: data, isLoading: false, isRefreshing: false });
    };
  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => { 
    setState((prev) => ({ ...prev, isRefreshing: true }));
    fetchData();
   };    
    
  if (state.isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={state.products}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        // refreshing={state.isRefreshing}
        // onRefresh={handleRefresh}
        refreshControl={
          <RefreshControl
            refreshing={state.isRefreshing!}
            onRefresh={handleRefresh}
          />
        }
      />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
