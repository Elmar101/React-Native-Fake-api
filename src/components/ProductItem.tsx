import { View, Text, Image, Touchable, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { IProduct } from '../api/products'

const ProductItem:FC<{product: IProduct}> = ({product}) => {
  return (
    <View className='m-2 flex-row border-2 items-center'>
        <Image source={{uri: product?.image}} style={{ width: 100, height: 100 }} />
     <View className='ml-2 flex-1'>
         <Text numberOfLines={1} ellipsizeMode='tail' className='font-bold'>{product?.title}</Text>
         <Text>{product?.description}</Text>
         <Text>{product?.category}</Text>
         <Text className='font-bold text-red-600'>{product?.price}</Text>
         <TouchableOpacity className=' cursor-pointer mt-2 mb-2'>
            <Text className='text-blue-600'>Buy Now</Text>
         </TouchableOpacity>
     </View>
    </View>
  )
}

export default ProductItem