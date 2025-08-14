import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useCallback, useState } from "react";
import AddProductItem from "../components/AddProductItem";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { addProduct, IProduct } from "../api/products";
import { RootStackParamList } from "../navigation/AppNavigator";

const AddProduct = () => {
  const nav = useNavigation<NavigationProp<RootStackParamList>>();

  const [state, setState] = useState<IProduct>({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  const handleChangeText = useCallback((name: string, value: string) => {
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSave = () => {
    addProduct(state).then((res) => {
        if(res?.id)
      nav.navigate("detail", { id: "1" });
    });
  };

  return (
    <SafeAreaView className="mt-14">
      <AddProductItem
        label="Title"
        value={state.title}
        onChangeText={(text) => {
          handleChangeText("title", text);
        }}
        placeholder="Enter title"
      />
      <AddProductItem
        label="category"
        value={state.category}
        onChangeText={(text) => {
          handleChangeText("category", text);
        }}
        placeholder="Enter category"
      />
      <AddProductItem
        label="description"
        value={state.description}
        onChangeText={(text) => {
          handleChangeText("description", text);
        }}
        placeholder="Enter description"
      />
      <AddProductItem
        label="Image"
        value={state.image}
        onChangeText={(text) => {
          handleChangeText("image", text);
        }}
        placeholder="Enter image"
      />
      <AddProductItem
        label="price"
        value={state.price.toString()}
        onChangeText={(text) => {
          handleChangeText("price", text);
        }}
        placeholder="Enter price"
      />
      <View className="flex-row justify-between px-2">
        <TouchableOpacity
          onPress={() => nav.goBack()}
          className="w-32 bg-red-500 h-12 rounded-xl items-center justify-center"
        >
          <Text className="text-white font-bold">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-32 bg-[#37c217] h-12 rounded-xl items-center justify-center"
          onPress={handleSave}
        >
          <Text className="text-white font-bold">Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddProduct;
