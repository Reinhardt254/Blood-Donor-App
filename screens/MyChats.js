import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { DataContext } from '../useContext/DataContext';
import { collection, getDoc, doc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { FocusedStatusBar, HomeHeader } from '../components';
import { SafeAreaView } from 'react-native';

const MyChats = () => {
  const navigation = useNavigation();
  const { userData } = useContext(DataContext);
  const [chats, setChats] = useState([]);
  const [otData, setOtData] = useState([]);
  const [lastMessage, setLatestMessage] = useState([]);
  const [id, setId] = useState([])
  const userm = auth.currentUser;
  const [setData, setSetData] = useState([]);

  const dr = doc

  useEffect(() => {
    const chatRef = collection(db, "myChats");
    const q = query(chatRef, where("ChatParticipants", "array-contains", userm.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chats = [];
      querySnapshot.forEach(async (doc) => {
        const chatData = doc.data();
        const participantIds = chatData.ChatParticipants.filter((participantId) => participantId !== userm.uid);
        const bloodDonorDocs = await Promise.all(participantIds.map((participantId) => getDoc(dr(db, "BloodDonors", participantId))));
        const bloodDonorData = bloodDonorDocs.map((doc) => doc.data());
        const chat = {
          chatId: doc.id,
          participantIds,
          ...chatData,
          bloodDonorData
        };
        setChats(chats => [...chats, chat]);
      });  
    }, (error) => {
      console.log(error);
    });
    return () => unsubscribe();
  }, [userm.uid]);
  
  

  const myData = (item) =>{
    const data = item.data
    navigation.navigate('Chat',{data})
  }

  return (
    <SafeAreaView style={{
      flex: 1
    }}>
    <View style={{
        flex: 0.1
      }}>
    <FocusedStatusBar />
    <HomeHeader />
     </View>
     <View style={styles.myMessages}>
      <Text style= {{
      color: "#042c54",
       fontSize: 13,
       fontWeight:'bold',
       margin: 10,
       }}>My Messages</Text>
     </View>
     <View style={{flex: 0.8}}>   
    <ScrollView>
    {chats.map((item) => (
        // <Text key={item.id}>{item.name}</Text>
    <View style={styles.container} key={item.id}>
      {item.bloodDonorData.map((bloodDonorData)=>(   
        <TouchableOpacity
          style={styles.chatItem}
          onPress={()=>myData(item)}
        >
        <Image style={styles.chatImage} key={bloodDonorData.id} source={{ uri: bloodDonorData.url }} />
          <View style={styles.chatInfo}>
            <Text style={styles.chatName} key={bloodDonorData.id}>{bloodDonorData.name}</Text>
          <View style={{
            flexDirection: "row",
          }}> 
            <Text style={styles.chatLastMessage} item={item.id}>{item.lastMessage}</Text>
          </View>  
          </View>
        </TouchableOpacity>
        ))}
    </View>
       ))} 
    </ScrollView>
    </View>
    <View style={{
      flex: 0.05,
      backgroundColor:"#042c54",
    }}>
    </View>
 </SafeAreaView>
 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  myMessages:{
    flex: 0.05,
    alignItems:"flex-start",
    justifyContent:'flex-start',
    backgroundColor: "#d9d9d9",
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#666',
  },
  chatLastMessage: {
    color: '#666',
  },
});

export default MyChats;
