import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'

const AdminFooter = () => {
  return (
    <View style={{
        flex: 1,
        flexDirection:"row",
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor:"#042c54",
        borderRadius: 0,
        margin: 0,
        marginBottom: 0,
      }}>
      {/* <TouchableOpacity style={{
          flex: 0.9,
        }}>
           <Icon.Button name="user" backgroundColor='#042c54' size={30} onPress={() => navigation.navigate("Account")} style={{
            marginBottom: 0,
            flexDirection: "column",
           }}> Account
           </Icon.Button>
        </TouchableOpacity> 

        <TouchableOpacity style={{
          flex: 0.9,
        }}>
           <Icon.Button name="users" backgroundColor='#042c54' size={30} onPress={() => navigation.navigate("Groups")} style={{
            marginBottom: 0,
            flexDirection: "column",
           }}>Group Chat
           </Icon.Button>
        </TouchableOpacity>   

        <TouchableOpacity style={{
          flex: 0.9,
        }}>   
           <Icon.Button name="comment" backgroundColor="#042c54" size={30} onPress={() => navigation.navigate("MyChats")} style={{
            marginBottom: 0, flexDirection: "column",}}>Chat</Icon.Button>
        </TouchableOpacity> */}
      </View>
  )
}

export default AdminFooter



