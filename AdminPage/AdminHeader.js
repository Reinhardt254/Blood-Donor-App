import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import { FocusedStatusBar } from '../components';
import React from 'react'


const AdminHeader = () => {
  return (
<View style={{
      flex: 1,
    }}>
      <FocusedStatusBar 
       barStyle="light-content"
       backgroundColor="transparent"
       translucent={true}
      />
      <View style={{
        flexDirection:"row",
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor:"#042c54",
        flex: 1,
        borderRadius: 0,
        margin: 0,
        marginBottom: 0,
      }}>
        <View style={{
         flexDirection: "column",
         marginLeft: 10,
         marginTop: 20,
        }}>
        <Text style={{color:"#fff", fontSize:20}}>Blood Donor</Text>
        <Text style={{color:"#fff"}}>Caring is giving</Text>
          </View>  
        <TouchableOpacity style={{
           marginTop: 20,
           marginBottom: 0,
           marginRight: 10,
        }}>   
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AdminHeader