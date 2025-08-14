import { ComponentProps } from "react";
import { Entypo } from "@expo/vector-icons";
import { Dimensions, StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProductsScreen from "../screens/ProductsScreen";
import { NavigationContainer } from "@react-navigation/native";
import DetailScreen from "../screens/DetailScreen";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { IProduct } from "../api/products";

export type RootStackParamList = {
  detail: { id: string };
  products: undefined;
  home: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

type EntypoNameType = ComponentProps<typeof Entypo>["name"];

const iconNameObj: Record<string, EntypoNameType> = {
  home: "home",
  fav: "heart",
  cart: "shopping-cart",
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const TAB_BAR_HEIGHT = Math.round(SCREEN_HEIGHT * 0.065);
const TAB_BAR_RADIUS = Math.round(TAB_BAR_HEIGHT / 2);

const renderTabIcon = (routeName: string, focused: boolean = false) => {
  const iconName = iconNameObj[routeName];
  const containerClass = `flex justify-center items-center w-12 h-12 rounded-full ${focused ? "bg-gray-200" : ""}`;
  return (
    <View className={containerClass.trim()}>
      <Entypo
        name={iconName}
        size={24}
        color={focused ? themeColors.bgPrimary : "#fff"}
      />
    </View>
  );
};

function MyTabs() {
  const insest = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => renderTabIcon(route.name, focused),
          tabBarStyle: {
            ...styles.tabBar,
            bottom: insest.bottom,
          },
          tabBarItemStyle: styles.tabBarItem,
        })}
      >
        <Tab.Screen name="home" component={HomeScreen} />
        <Tab.Screen name="cart" component={ProductsScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="home"
          component={MyTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="products"
          component={ProductsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="detail"
          component={DetailScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabBar: {
    position: "absolute",
    backgroundColor: themeColors.bgPrimary,
    height: TAB_BAR_HEIGHT,
    borderRadius: TAB_BAR_RADIUS,
    marginLeft: SCREEN_WIDTH * 0.05,
    marginRight: SCREEN_WIDTH * 0.05,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  tabBarItem: {
    marginTop: 10,
  },
});
