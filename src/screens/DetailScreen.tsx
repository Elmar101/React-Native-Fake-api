import {
  ActivityIndicator,
  Image,
  ScrollView,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator";
import { getProductById, IProduct } from "../api/products";
import { ProductDetailItem } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";

type DetailScreenProps = {
  route: RouteProp<RootStackParamList, "detail">;
};
const DetailScreen: FC<DetailScreenProps> = ({ route: { params } }) => {
  const [state, setState] = useState<{
    isLoading: boolean;
    product?: IProduct;
    error?: string;
  }>({
    isLoading: true,
  });
  const fetchProductById = async (id: string) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const data = await getProductById(id);
      setState((prev) => ({ ...prev, isLoading: false, product: data }));
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false, error: "error" }));
    }
  };
  useEffect(() => {
    if (params.id) {
      fetchProductById(params.id);
    }
  }, [params.id]);

  if (state.isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex-row justify-center my-4">
          <Image
            source={{ uri: state.product?.image }}
            style={{ width: 200, height: 200 }}
          />
        </View>
        <ProductDetailItem label="Title" text={state.product?.title!} />
        <ProductDetailItem label="Category" text={state.product?.category!} />
        <ProductDetailItem
          label="Description"
          text={state.product?.description!}
        />
        <ProductDetailItem
          label="Price"
          text={state.product?.price.toString()!}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;