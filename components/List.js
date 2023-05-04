import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const List = ({handlePress, ...props}) => {
  return (
    <View style={{
    marginRight:10,
    }}
        >
      <TouchableOpacity onPress={handlePress}>
      <Text style={{
           color:"#042c54",
           borderBottomWidth: 2,
           borderColor: "#042c54"
      }}>List</Text>
      </TouchableOpacity>
    </View>
  )
}

export default List










