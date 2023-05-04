import {usesState} from "react"
import { View, SafeAreaView, FlatList, Text, Image, TouchableOpacity} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from "@react-navigation/native";
import FocusedStatusBar from "../components/FocusedStatusBar";
import { Button } from "react-native";

  const UserAccount = ({route}) => {
  const {data} = route.params
  const navigation = useNavigation();
  const handleNavigate =()=>{
    navigation.navigate("Chat", {data})
  }
  return (
    <View style={{flex: 1, backgroundColor:"#042c54"}}>
      <View style={{
        flex: 0.05,
      }}>
      <FocusedStatusBar 
       barStyle="light-content"
       backgroundColor="transparent"
       translucent={true}
      />
      </View>

       <View style = {{
        flex: 0.05,
       }}>     
        <Text style={{
          color:"#fff",
          paddingTop: 10,
          paddingLeft: 20,
          alignItems:"flex-start",
          justifyContent:"center",
          fontSize: 20,
        }}>Profile</Text>
      </View>

      <View style={{
        flex: 0.25,
        flexDirection:"row",
        alignItems: "center",
        justifyContent:"center",
        backgroundColor:"#fff",
        marginLeft:10,
        marginRight: 10,
        marginTop: 10,
        borderTopRightRadius: 20, 
        borderTopLeftRadius: 20,
      }}> 
        <Image source={{uri :data.url}}
            style={{
              margin:10,
              width: 200,
              height: 200,
              borderRadius: 100,
            }}
          />
          </View>

        <View style={{
          flex: 0.6,
          backgroundColor:"#fff",
          marginLeft:10,
          marginRight: 10,
          marginTop: 1,
          borderBottomRightRadius: 20, 
          borderBottomLeftRadius: 20,
        }}>
    <View style={{
      margin: 20,
    }}>
       <Text style={{fontSize: 20, color:"#042c54"}}>Name</Text>
        <Text style={{
          borderBottomColor: "#042c54",
          borderBottomWidth: 1,
          height: 30,
          borderRadius: 5,
          fontSize: 15,
        }}>{data.name}</Text>
         
         <Text style={{fontSize: 20, marginTop: 10, color:"#042c54"}}>Region</Text>
        <Text style={{         
          height: 30,
          borderRadius: 5,
          fontSize: 15,
          borderBottomColor: "#042c54",
          borderBottomWidth: 1,
        }}>{data.region}</Text>

        <Text style={{fontSize: 20, marginTop: 10, color:"#042c54"}}>Blood Type</Text>
        <Text style={{
          height: 30,
          borderRadius: 5,
          fontSize: 15,
          borderBottomColor: "#042c54",
          borderBottomWidth: 1,
        }}>{data.bloodType}</Text>

        <Text style={{fontSize: 20, marginTop: 10, color:"#042c54"}}>Date of Birth</Text>
        <Text style={{
          height: 30,
          borderRadius: 5,
          fontSize: 15,
          borderBottomColor: "#042c54",
          borderBottomWidth: 1,
        }}>{data.age}</Text>

        <Text style={{fontSize: 20, marginTop: 10, color:"#042c54"}}>Email</Text>
        <Text style={{
          height: 30,
          borderRadius: 5,
          fontSize: 15,
          borderBottomColor: "#042c54",
          borderBottomWidth: 1,
        }}>{data.email}</Text>

        <Text style={{fontSize: 20, marginTop: 10, color:"#042c54"}}>Phone Number</Text>
        <Text style={{
          height: 30,
          borderRadius: 5,
          fontSize: 15,
          borderBottomColor: "#042c54",
          borderBottomWidth: 1,
        }}>{data.phoneNumber}</Text>
        <TouchableOpacity style={{margin: 10}}>
        <Button 
         style={{
           flex: 0.1,
         }}
         title="Message"
         color="#042c54"
         onPress={handleNavigate}
         />
      </TouchableOpacity>
        <Text></Text>
        </View>
        </View>
    </View>
  )
} 

export default UserAccount












