import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';


const NewsHome = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([])

    useEffect(() => {
      const newsRef = collection(db, "News");
      const unsubscribe = onSnapshot(newsRef, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setData(data)
      });
      return () => {
        unsubscribe();
      };
    }, []);

  return (
    
        <View style={{backgroundColor:"#F2F2F2"}}>
            <Text style={{
                marginLeft: 15,
                marginTop: 10,
                color: "#042c54",
            }}>News</Text>
          <ScrollView>  
           {data.map((items) => (  
            <View style={{
                 marginLeft: 10,
                 marginRight:10,
                 marginTop:10,
                 borderRadius: 10,
                 backgroundColor: "#fff",
            }}>

              <View style={{
                marginLeft: 10,
                marginRight:10,
                marginTop: 10,
              }}>  
              <Text style={{color:"#042c54"}}>{items.heading}</Text>
              </View>  

              <Text style={{
                 marginLeft: 10,
                 marginRight:10,
                 marginTop: 10,
                 marginBottom:10,
              }}> 
               {items.news}
              </Text>
            </View>
            ))} 
            </ScrollView>
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
      height: "7%",
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

export default NewsHome



















