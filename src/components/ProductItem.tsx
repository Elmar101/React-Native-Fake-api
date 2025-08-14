import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import React, { FC, use } from "react";
import { Entypo, Fontisto } from "@expo/vector-icons";
import { IProduct } from "../api/products";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";

const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
  const navigator = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View className="m-2 flex-row border-2 items-center pb-2">
      <Image
        source={{ uri: product?.image }}
        style={{ width: 100, height: 100 }}
      />
      <View className="ml-2 flex-1">
        <Text numberOfLines={1} ellipsizeMode="tail" className="font-bold">
          {product?.title}
        </Text>
        <Text>{product?.description}</Text>
        <Text>{product?.category}</Text>
        <Text className="font-bold text-red-600">{product?.price}</Text>
        <View className="bg-[#d4a574] p-1 rounded-full max-w-44 right-[5px] absolute bottom-0">
          <TouchableOpacity
            className="rounded-full p-2 bg-primary"
            onPress={() => navigator.navigate("detail", { id: product.id.toString()})}
          >
            <Fontisto name="shopping-basket-add" size={16} color="white">
              <Text className="text-blue-600"> Add to Cart</Text>
            </Fontisto>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;
