import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import AdminFooter from './AdminFooter'
import { TextInput } from 'react-native'
import { auth, db } from '../firebaseConfig'
import { addDoc, collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore'

const PostEmergencies = () => {
  const [heading, setHeading] = useState("")
  const [news, setNews] = useState("")
  const [data, setData] = useState([])

  const postNews = () =>{
    auth
    const newsRef = collection(db, "News")
    addDoc(newsRef,{
      heading: heading,
      news: news,
    });
  }

  useEffect(() => {
    const newsRef = collection(db, "News");
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
    const docRef = doc(db, "News", uid);
    deleteDoc(docRef);
  };


  return (
    <View style={{flex:1}}>
      <View style={{flex:0.1}}>
        <AdminHeader />
      </View>
      

      <View style={{flex:0.3,  backgroundColor:"F2F2F2"}}> 
      <View style={{flex:0.3}}>
        <View style={{
          margingTop: 20,
            flexDirection: "column",
            justifyContent:"space-between",
            alignItems:"center",
        }}>
           <TextInput style={{
             width: "80%",
             marginTop: 10,
             height: "40%",
             borderRadius:20,
             borderWidth:1,
             borderColor:"#ccc",
             marginLeft: 20,
             marginRight: 20,
           }}
           placeholder="  Heading"
           value={heading}
           onChangeText={text => setHeading(text)}
           />

          <TextInput style={{
             width: "80%",
             marginTop: 10,
             height: "40%",
             borderRadius:20,
             borderWidth:1,
             borderColor:"#ccc",
             marginLeft: 20,
             marginRight: 20,
           }}
           placeholder="  Post News"
           value={news}
           onChangeText={text => setNews(text)}
           />

            <TouchableOpacity style={{
             marginTop: 10,
             width: "60%",
             borderRadius: 5,
             backgroundColor:"#042c54",
             height: 40,
             alignContent:"center",
             justifyContent:"center",
           }}
           onPress={() => {postNews()}}
           >

           <Text style={{
                 color:"#fff",
                 alignSelf: "center",
                 justifyContent:"center",
             }}>send</Text>
           </TouchableOpacity>
        </View>
      </View>
   </View> 
      <View style={{flex:0.6, backgroundColor:"F2F2F2"}}>
        <Text style={{
          marginLeft: 10,
          marginTop:10, 
          color:"#042c54",
        }}>Posted News</Text>
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
         <TouchableOpacity style={{
            borderRadius: 5,
            backgroundColor:"#042c54",
            width:"15%",
            height: 40,
            alignContent:"center",
            justifyContent:"center",
          }}
          onPress={() => handleDelete(item.id)}
          > 
            <Text style={{
                color:"#fff",
                alignItems:"center",
                justifyContent:"center",
                marginLeft: 8,
                }}>Delete</Text>
          </TouchableOpacity>         
        <View style={{
            marginTop:10,
            borderRadius: 5,
            backgroundColor: "#fff",
            width: "80%",
        }}>
           <View style={{
                flexDirection:"row",
                marginLeft: 10,
                marginRight:10,
                marginTop: 10,
              }}>  
              <Text style={{color:"#042c54"}}>{item.heading}</Text>
              </View>  
              <Text style={{
                marginLeft: 10,
                marginRight:10,
                marginTop: 10,
                marginBottom:10,
              }}>
              {item.news}
         </Text>
       </View>   
         
      </View>
          ))}  
      </ScrollView> 
      </View>
        
   
    </View>
  )
}

export default PostEmergencies

















