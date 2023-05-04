import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import AdminFooter from './AdminFooter'
import { TextInput } from 'react-native'
import { auth, db } from '../firebaseConfig'
import { addDoc, collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore'
import { ScrollView } from 'react-native'

const PostEmergencies = () => {

  const [heading, setHeading] = useState("")
  const [emergency, setEmergency] = useState("")
  const [data, setData] = useState([])

  const postEmergency = () =>{
    auth
    const newsRef = collection(db, "Emergencies")
    addDoc(newsRef,{
      heading: heading,
      emergency: emergency,
    })
  }

  useEffect(() => {
    const newsRef = collection(db, "Emergencies");
    const unsubscribe = onSnapshot(newsRef, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setData(data);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleDelete = (id) => {
    const uid = id
    const docRef = doc(db, "Emergencies", uid);
    deleteDoc(docRef);
  };

  return (
    <View style={{flex:1}}>
      <View style={{flex:0.1}}>
        <AdminHeader />
      </View>
      <View style={{flex:0.5, backgroundColor:"F2F2F2"}}>
      <View style={{
        flex:0.1
      }}>   
      <Text style={{
          marginLeft: 10,
          marginTop:10, 
          color:"#042c54",
        }}>Posted Emergencies</Text>
        </View>
        <ScrollView> 
        {data.map((item) =>( 
        <View style={{
            flexDirection:"row",
            alignItems:'center',
            justifyContent:"space-between",
            marginLeft: 10,
            marginRight:10,
            marginTop:10,
            }}
            key={item.id}
            > 
        <View style={{
            marginTop:10,
            borderRadius: 5,
            backgroundColor: "#fff",
            width: "80%"
        }}>
         <View style={{
                flexDirection:"row",
                marginLeft: 10,
                marginRight:10,
                marginTop: 10,
              }}>  
              <Text style={{color:"#042c54"}}>{item.heading}</Text>
              <Text style={{marginLeft:10, color:"#042c54"}}></Text> 
         </View> 
         <Text style={{
           marginLeft: 10,
           marginRight:10,
           marginTop: 10,
           marginBottom:10,
         }}>
           {item.emergency}
         </Text>
       </View>     
          <TouchableOpacity style={{
            borderRadius: 5,
            backgroundColor:"#042c54",
            width:"15%",
            height: 40,
            alignContent:"center",
            justifyContent:"center",
          }}
          onPress={()=>{handleDelete(item.id)}}
          > 
            <Text style={{
                color:"#fff",
                alignItems:"center",
                justifyContent:"center",
                marginLeft: 8,
                }}>Delete</Text>
          </TouchableOpacity>  
      </View>
      ))}
     </ScrollView>
      </View>
      <View style={{flex:0.3, backgroundColor:"F2F2F2"}}>
        <View style={{
          marginTop:20,
            flexDirection:"column",
            justifyContent:"space-between",
            alignItems:"center",
            backgroundColor: "fff",
            borderTopEndRadius: 5,
            marginLeft: 5,
            marginRight: 5,
        }}>
           <TextInput style={{
             width: "80%",
             height: "30%",
             borderRadius:20,
             borderWidth:1,
             borderColor:"#ccc",
           }}
           placeholder="  Post Emergency Heading"
           value={heading}
           onChangeText={text => setHeading(text)}
           />
          <TextInput style={{
             width: "80%",
             height: "30%",
             borderRadius:20,
             borderWidth:1,
             borderColor:"#ccc",
           }}
           placeholder="  Post an Emergency"
           value={emergency}
           onChangeText={text => setEmergency(text)}
           />
           <TouchableOpacity style={{
             marginLeft: 5,
             borderRadius: 5,
             backgroundColor:"#042c54",
             width:"50%",
             height: "25%",
             alignContent:"center",
             justifyContent:"center",
           }}
           onPress={()=>{postEmergency()}}
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
  )
}

export default PostEmergencies

















