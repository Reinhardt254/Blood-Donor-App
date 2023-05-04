import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Animated } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { HomeFooter, HomeHeader } from '../components';
import { auth, db } from '../firebaseConfig';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { DataContext } from '../useContext/DataContext';

const UserEmergency = () => {
    const { cuserData, } = useContext(DataContext);
    const navigation = useNavigation();
    const [data, setData] = useState([])
    const [message, setMessage] = useState("")
    const [emergency, setEmergency] = useState("")
    const [scrollX] = useState(new Animated.Value(0));


      
  
    const postRequest = () =>{
      auth
      const newsRef = collection(db, "BloodRequest")
      addDoc(newsRef,{
       message: message,
       name: auth.currentUser?.displayName,
      })
    }

    useEffect(() => {
      const newsRef = collection(db, "Emergencies");
      const unsubscribe = onSnapshot(newsRef, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setData(data);
      });
      return () => {
        unsubscribe();
      };
    }, []);
    
  return (
    <View style={{flex:1}}>
        <View style={{flex:0.1,}}>
           <HomeHeader />
        </View>
        <View style={{
          flex: 0.05,
          backgroundColor: "#ccc",
        }}>   
        <Text style={{
          marginLeft: 10,
          marginTop:10, 
          color:"#042c54",
          fontSize: 20,
          fontWeight:'bold',
        }}>Emergencies</Text>
        </View>
        <View style={{flex:0.45, backgroundColor:"#F2F2F2"}}>
        <ScrollView
        horizontal={true} 
        pagingEnabled={true}
        > 
          {data.map((items)=>( 
           <View style={{
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"center",
           }}>  
            <View style={{
                 marginBottom: 20,
                 marginLeft: 20,
                 marginRight:20,
                 marginTop:20,
                 borderRadius: 10,
                 backgroundColor: "#fff",
                 height: "60%",
                 width: 300,
                 borderWidth:1,
                 borderColor:"#ccc",
            }}>
              <View style={{
                flexDirection:"row",
                justifyContent:"space-between",
                marginLeft: 10,
                marginRight:10,
                marginTop: 10,
              }}>  
              <Text style={{color:"#042c54"}}>{items.heading}</Text>
              <Text style={{marginLeft:10, color:"#042c54"}}></Text> 
              </View>  
              <View style={{
                justifyContent:"center",
                alignItems:"center",
              }}>
              <Text style={{
                 marginLeft: 20,
                 marginRight:20,
                 marginTop: 20,
                 marginBottom:20,
                 alignItems: "center",
                 justifyContent:"center",
              }}> 
               {items.emergency}
              </Text>
              </View>
            </View>
            </View>
            ))}
           </ScrollView> 
        </View>
        <View style={{flex:0.4, backgroundColor:"#ccc"}}> 
        <View style={{
              flexDirection:"column",
        }}>
          <View style={{
             height: "85%",
             marginLeft: 10,
             marginRight:10,
             marginTop:10,
             marginBottom:10,
             backgroundColor: "#fff",
             borderRadius: 5,
             alignItems:"center",
             justifyContent:"center",
          }}>
          <Text style={{
            fontSize: 17,
            fontWeight:'bold',
            marginLeft: 5,
            marginTop: 5,
            marginBottom: 5,
            color:"#042c54",
          }}>Blood Request</Text>
        <TextInput style={{
             width: "80%",
             height: "30%",
             borderRadius:10,
             borderWidth:1,
             borderColor:"#ccc",
           }}
           placeholder="  Blood Request Emergency"
           value={message}
           onChangeText={text => setMessage(text)}
           />
            <TouchableOpacity style={{
             marginBottom: 10, 
             marginTop: 10,
             marginLeft: 5,
             borderRadius: 5,
             backgroundColor:"#042c54",
             width:"50%",
             height: "15%",
             alignContent:"center",
             justifyContent:"center",
           }}
           onPress={()=>{postRequest()}}
           >
             <Text style={{
                 color:"#fff",
                 alignSelf:"center",
                 justifyContent:"center",
             }}>Send</Text>
           </TouchableOpacity>
            </View>
        </View>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: '#F2F2F2',
    },
    button: {
      marginTop: "10%",
      height: "8%",
      marginHorizontal: 4,
      borderRadius: 4,
      backgroundColor:"#042c54",
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default UserEmergency



















