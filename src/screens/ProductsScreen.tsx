import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAllProducts, IProduct } from "../api/products";
import { ProductItem } from "../components";

const ProductsScreen = () => {
  const [state, setState] = useState<{
    products: IProduct[];
    isLoading: boolean;
    isRefreshing?: boolean;
    searchValue?: string;
  }>({ products: [], isLoading: false, isRefreshing: false, searchValue: "" });
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

  const handleSearchChange = (text: string) => {
    if(text === "") {
      fetchData();
      return;
    }
    const filteredProducts = state.products.filter(
      (product) =>
        product.title.toLowerCase().includes(text.toLowerCase()) ||
        product.description.toLowerCase().includes(text.toLowerCase()) ||
        product.price.toString().includes(text) ||
        product.category.toLowerCase().includes(text.toLowerCase())
    );
    setState({ products: filteredProducts, isLoading: false, isRefreshing: false, searchValue: text });
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
      <View className="flex-row items-center mb-4 gap-2 p-2 mt-2">
        <TextInput
          placeholder="search..."
          className="flex-1 border text-[#d4a574] rounded-lg"
          value={state.searchValue ?? ""}
          onChangeText={handleSearchChange}
        />
      </View>
      <FlatList
        data={state.products}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        // refreshing={state.isRefreshing}
        // onRefresh={handleRefresh}
        refreshControl={
          <RefreshControl
            refreshing={state.isRefreshing!}
            onRefresh={handleRefresh}
          />
        }
        ListEmptyComponent={() => (
          <View style={styles.center}>
            <Text>No products found</Text>
          </View>
        )}
        ListFooterComponent={
            <View className="mb-44" />
        }
      />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  input: { width: 200, height: 40, margin: 10, padding: 10, borderWidth: 1 },
});
