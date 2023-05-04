import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import AdminFooter from './AdminFooter'
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { ScrollView } from 'react-native';

const Emergency = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([])

    useEffect(() => {
      const newsRef = collection(db, "BloodRequest");
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
           <AdminHeader />
        </View>
        <View style={{flex:0.7, backgroundColor:"#F2F2F2"}}>
        <Text style={{
          marginLeft: 10,
          marginTop:10, 
          color:"#042c54",
        }}>Emergencies</Text>
        <ScrollView> 
          {data.map((items) =>( 
            <View style={{
                 marginLeft: 10,
                 marginRight:10,
                 marginTop:10,
                 borderRadius: 10,
                 backgroundColor: "#fff",
            }}
            key={items.id}
            >
              <View style={{
                flexDirection:"row",
                marginLeft: 10,
                marginRight:10,
                marginTop: 10,
              }}>  
              <Text style={{color:"#042c54"}}>{items.name}</Text>
              <Text style={{marginLeft:10, color:"#042c54"}}>Time</Text> 
              </View>  
              <Text style={{
                 marginLeft: 10,
                 marginRight:10,
                 marginTop: 10,
                 marginBottom:10,
              }}> 
               {items.message}
              </Text>
            </View>
           ))} 
          </ScrollView>   
        </View>
        <View style={{
          flex: 0.1,
          backgroundColor: "fff",
          borderRadius: 5,
          margin: 10,
        }}> 
        <TouchableOpacity style={styles.button}
         onPress={() => navigation.navigate("PostEmergencies")}
        >
        <Text style={styles.buttonText}>Post a Patient Emergency</Text>
      </TouchableOpacity>
       </View> 
        <View style={{flex:0.1}}>
            <AdminFooter />
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
      height: "60%",
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

export default Emergency



















