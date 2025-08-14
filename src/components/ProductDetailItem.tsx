import { Text, View } from 'react-native'

const ProductDetailItem = ({label, text}: {label: string, text: string}) => {
  return (
    <View className='flex-row justify-between m-2 border-2 p-2 rounded-lg'>
      <Text className='font-bold'>{label}</Text>
      <View className='flex-1 items-end'>
        <Text className='text-right'>{text}</Text>
      </View>
    </View>
  )
}

export default ProductDetailItem