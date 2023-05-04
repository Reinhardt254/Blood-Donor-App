import { View, Text,Button, TouchableOpacity, Image, StyleSheet } from 'react-native'
import {useEffect, useState} from 'react'
import FocusedStatusBar from '../components/FocusedStatusBar'
import { useNavigation } from '@react-navigation/native'
import { auth,db, storage} from '../firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes  } from "firebase/storage";
import{getDocs, addDoc, collection, setDoc, doc, updateDoc, onSnapshot} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker"
import Icon from 'react-native-vector-icons/FontAwesome';
import { Trending } from '../components';
import { updateProfile } from 'firebase/auth';
import { DataContext } from '../useContext/DataContext';
import { useContext } from 'react';

const Account = () => {
  const {cuserData, setCUserData} = useContext(DataContext);
const navigation = useNavigation();
  const [imageURL, setImageURL] = useState(null);
  const [bloodDonors, setBloodDonors] = useState([]);
  const [data, setData] = useState([]);
  const [dimage, setDimage] =useState();
  const bloodDonorsCollectionRef = collection(db, "BloodDonors")

  useEffect(() => {
    const getBlooDonors = async () => {
    //Read the data
    //set the users list
    try{
      const data = await getDocs(bloodDonorsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(), id: doc.id,
      }));
      setBloodDonors(filteredData);
    } catch (err) {
      console.error(err);
    }

    };
    getBlooDonors();
  },[])
 //Adding profile Image
 //Uploading our user Photos
 const pickImage =async () =>{
  try { 
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect:[3,3],
    quality: 1,
  });
  //Uploading to Firebase
  if (!result.canceled) {
    auth
    const user = auth.currentUser
    storage
    const us = user.uid
    const storageRef = ref(storage, `users/${us}.jpg`);
    const img = await fetch(result.assets[0].uri);
    const bytes =  await img.blob()
    const uploadTask = uploadBytesResumable(storageRef, bytes);
    await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) =>{
    try {
    const imageURL = downloadUrl;
    setDimage(imageURL)
    updateProfile(user,{
      photoURL: imageURL, 
      })
    const bloodDonorsCollectionRef = doc(db, "BloodDonors", user.uid);
    await updateDoc(bloodDonorsCollectionRef, {
      url: imageURL,
    })
    } catch(error){
      alert("error getting link")
    }
    });
    };
} catch(error){
  alert("error uploading pic")
}
  };

  useEffect(() => {
    // Retrieve the image URL from Firestore
    const user = auth.currentUser
    const profileRef = doc(db, 'BloodDonors', user.uid);
    const unsubscribe = onSnapshot(profileRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setData(data)
        setCUserData(data)
        if (data.url) {
          setImageURL({ uri: data.url });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth
    .signOut()
    .then(()=>{
      navigation.replace("Login")
    })
    .catch(error => {"An error happened"})
  }
 
  return (
    <View style={{ flex: 1, backgroundColor:"#042c54"}}>
      <View style={{
        flex:0.1,
      }}>  
       <FocusedStatusBar 
             barStyle="light-content"
       backgroundColor="transparent"
       translucent={true}
       />
       </View>
       <View style={{
        flex: 0.05,
       }}> 
        <Text style={{
           color:"#fff",
           paddingLeft: 20,
           paddingBottom: 2,
           alignItems:"flex-start",
           justifyContent:"center",
           fontSize: 20,
        }}>My Profile</Text>
       </View>

       <View style={{
        flex: 0.8,
        backgroundColor: "#fff",
        justifyContent: "space-around",
        alignItems:"center",
        marginLeft:10,
        marginRight: 10,
        borderRadius: 10, 
       }}>     
       <TouchableOpacity   onPress={pickImage}
        style={{
             flex: 0.3,
              margin:10,
              width: 200,
              height: 200,
              borderRadius: 100,
              alignItems: 'center',
              justifyContent:"center",
            }}>    
       <Image source = { imageURL || require('../assets/images/Profile.jpg')}
        style={{
               alignItems: 'center',
               justifyContent:"center",
               margin:10,
               width: 200,
               height: 200,
               borderRadius: 100,
               }}/>
       </TouchableOpacity>
      <View style={styles.container}> 
      <Text style={styles.Mess}>name: {auth.currentUser?.displayName}</Text> 
       <Text style={styles.Mess}>Email: {data.email}</Text>
       <Text style={styles.Mess}>Phone Number: {data.phoneNumber}</Text>
       <Text style={styles.Mess}>age: {data.age}</Text>
       <Text style={styles.Mess}>Blood Type: {data.bloodType}</Text>
       <Text style={styles.Mess}>Region: {data.region}</Text>
       </View>
       
       <TouchableOpacity style={{margin: 10}}>
        <Button 
         style={{
           flex: 0.1,
         }}
         title="Logout"
         color="#042c54"
         onPress={handleSignOut}
         />
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
   flex: 0.4,
  },
  Mess:{
    borderBottomColor: "#042c54",
    borderBottomWidth: 1,
    height: 50,
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 10,
  },
});














