import React, { useState, useEffect } from 'react';
import MapView,{Callout, Marker} from 'react-native-maps';
import { StyleSheet, View,Text,  Platform, Alert, Button, TouchableOpacity} from 'react-native';
import {Svg, Image as ImageSvg} from 'react-native-svg';
import * as Location from 'expo-location';
import { useNavigation} from '@react-navigation/native';
import { auth, db } from '../firebaseConfig';
import { getDatabase, ref } from "firebase/database";
import{addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc, updateDoc} from "firebase/firestore";
import 'firebase/firestore';
import { useContext } from 'react';
import { DataContext } from '../useContext/DataContext';


  const Gmaps = () => {
  const { data, setData, userData, setUserData, cuserData } = useContext(DataContext);
  const navigation = useNavigation();
  const bloodDonorsCollectionRef = collection(db, "BloodDonors")
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [datas, setDatas] = useState([]);
  const [mydata, setMydata] = useState();
  const [longitude, setlongitude] = useState()
  const [latitude, setLatitude] = useState()
  const [pin, setpin] = useState({
    latitude: 0,
    longitude:0,
  });

  useEffect(() => {
    // Ask for permission to access location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
       // Get the user's current location
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      // Store the user's current location in database
       const { latitude, longitude } = location.coords      
       setpin({
        latitude:latitude,
        longitude: longitude,
       })    

       auth
       const user = auth.currentUser
       const bloodDonorsCollectionRef = doc(db, "BloodDonors", user.uid,)
        await updateDoc(bloodDonorsCollectionRef,{
        latitude:latitude,
        longitude:longitude,
       }
        ).catch((e)=>{
      alert("errror")
     })
         })();
       }, []);
     
       
        useEffect(() => {
          const bloodDonorsCollectionRef = collection(db, 'BloodDonors');
          const unsubscribe = onSnapshot(bloodDonorsCollectionRef, (querySnapshot) => {
            const filteredData = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            setDatas(filteredData);
            setData(filteredData);
          });
          return unsubscribe;
        }, []);
  
      const handlePresss = (data) =>{
        navigation.navigate("UserAccount", {data})
      }
   
 

  return (
    <View style={styles.container}>
      <View>
      </View>
      <MapView style={styles.map} 
       initialRegion={{
        latitude:  0.135572, 
        longitude: 37.715210,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
       }}
      >
        <Marker coordinate={pin}
           pinColor="red"
        >
          <Callout style={{
              width: 250,
              height: 130,
              backgroundColor: '#fff',
              borderRadius: 15,
              flexDirection: "column",
              justifyContent: "space-between",
              alignContent:"center",
            }} 
            >
              <View style={{
               flexDirection:"row",
               justifyContent: "space-between",
               alignItems:"center",
               alignContent:"center",
               height:"80%",
               backgroundColor:"#fff"
              }}> 
              <View style={{
                alignItems:"center",
                justifyContent:"center",
                marginTop: 25,
              }}> 
              <Svg width={120} height={100}> 
              <ImageSvg style={{
                borderRadius: 10,
              }}
              width={'100%'} 
              height={'100%'}
              href={{uri : cuserData.url }}
              />
              </Svg>
              </View>
                         
              <View style={{
                justifyContent:"center",
                alignItems:"flex-start",
                justifyContent:"space-around",
                backgroundColor: "#fff",
                height: "80%",
                width: "80%"
              }}>  
              <Text style={{
                fontSize: 17,
              }}>{cuserData.name}</Text>
              <Text style={{
                fontSize: 14,
              }}>{cuserData.bloodType}</Text>
              <Text style={{
              
                fontSize: 12,
              }}>{cuserData.region}</Text>
              <Text style={{
              
              fontSize: 12,
            }}>{cuserData.userType}</Text>
              </View>
              </View>
            </Callout>
        </Marker>
        
        {
         datas.map(BloodDonors =>(  
            <Marker 
             key = {BloodDonors.uid}    
             coordinate={{
              latitude:BloodDonors.latitude,
              longitude:BloodDonors.longitude,
            }}
            pinColor="green"
            >
               {setUserData(BloodDonors)}

            <Callout style={{
              width: 250,
              height: 130,
              backgroundColor: '#fff',
              borderRadius: 15,
              flexDirection: "column",
              justifyContent: "space-between",
              alignContent:"center",
            }} 
            onPress={()=>handlePresss(BloodDonors)}
            >
              <View style={{
               flexDirection:"row",
               justifyContent: "space-between",
               alignItems:"center",
               alignContent:"center",
               height:"80%",
               backgroundColor:"#fff"
              }}> 
              <View style={{
                alignItems:"center",
                justifyContent:"center",
                marginTop: 25,
              }}> 
              <Svg width={120} height={100}> 
              <ImageSvg style={{
                borderRadius: 10,
              }}
              width={'100%'} 
              height={'100%'}
              href={{uri : BloodDonors.url }}
              key={BloodDonors.uid}
              />
              </Svg>
              </View>
                         
              <View style={{
                justifyContent:"center",
                alignItems:"flex-start",
                justifyContent:"space-around",
                backgroundColor: "#fff",
                height: "80%",
                width: "80%"
              }}>  
              <Text style={{
                fontSize: 17,
              }} key={BloodDonors.uid}>{BloodDonors.name}</Text>
              <Text style={{
                fontSize: 14,
              }}  key={BloodDonors.uid}>{BloodDonors.bloodType}</Text>
              <Text style={{
              
                fontSize: 12,
              }}  key={BloodDonors.uid}>{BloodDonors.region}</Text>
              <Text style={{
              
              fontSize: 12,
            }}  key={BloodDonors.uid}>{BloodDonors.userType}</Text>
              </View>
              </View>
            </Callout>
            </Marker>
          ))
          }
        </MapView>
    </View>
  );
}

export default Gmaps

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});







// '@react-native-async-storage/async-storage'

