import { Text, TextInput, View } from "react-native";

const AddProductItem = ({
  label,
  value,
  onChangeText,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: ((text: string) => void) | undefined;
  placeholder: string;
}) => {
  return (
    <View className="flex-row justify-between m-2 border-2 p-2 rounded-lg">
      <Text className="font-bold">{label}</Text>
      <View className="flex-1 items-end">
        <TextInput
          className="p-2 rounded-lg"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

export default AddProductItem;
