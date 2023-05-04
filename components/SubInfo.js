import { fonts } from '@rneui/base';
import { View, Text } from 'react-native'

export const DonName = ({name}) => {
  return (
    <View>
      <Text style={{
        fontSize: 15,
        color: "#042c54",
        fontWeight: "bold",
    }}>{name}</Text>
    </View>
  )
}

export const DonCounty = ({county}) => {
    return (
      <View>
        <Text style={{
        color: "white",
        fontSize: 15,
    }}>{county}</Text>
      </View>
    )
  }

  export const DonBType = ({bType}) => {
    return (
      <View>
        <Text style={{    
        color: "#042c54",
        fontSize: 10,
        fontWeight: "bold",
    }}>{bType}</Text>
      </View>
    )
  }

  export const DONDate = ({dDate}) => {
    return (
      <View>
        <Text style={{    
          color: "white",
      
    }}>{dDate}</Text>
      </View>
    )
  }
  






















