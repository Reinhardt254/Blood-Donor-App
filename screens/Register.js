import { View, Text, Button, TouchableOpacity, TextInput, Image, Alert, ScrollView, KeyboardAvoidingView } from 'react-native'
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { auth,db, storage} from '../firebaseConfig';
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import{addDoc, collection, doc, setDoc} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker"
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';

const Register = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profileName, setProfileName] = useState("")
    const [newName, setNewName] = useState ("")
    const [newAge, setNewAge] = useState (0)
    const [newphoneNumber, setNewPhoneNumber] = useState (0)
    const [newRegion, setNewRegion] = useState ("")
    const [newBloodType, setNewBloodType] = useState ("")
    const [donor, setDonor] = useState ("")

  const handleSignUp = async () => {
    try {
       createUserWithEmailAndPassword(auth, email,password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user,{
        displayName: newName,
        profileName: profileName,  
        name:newName,
        age:newAge,
        bloodType:newBloodType,
        region: newRegion,
        phoneNumber: newphoneNumber,
        password: password,
        email: email,
        })
        const bloodDonorsCollectionRef = doc(db, "BloodDonors", user.uid)
        setDoc(bloodDonorsCollectionRef,{
        profileName: profileName,  
        name:newName,
        age:newAge,
        bloodType:newBloodType,
        region: newRegion,
        phoneNumber: newphoneNumber,
        password: password,
        email: email,
        uid: user.uid,
        UserType: donor,
       }) 
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("invalid details")
      })
    }catch{
    alert('invalid details')
    }
  };  

  return (
    
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#042c54",
      position: 'relative',
    }}>
      <KeyboardAvoidingView behavior="padding" enabled style={{
        flex: 0.6,
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom:10,
      }}>
        <ScrollView style={{
          flex: 0.6,
        }}>
           <TextInput
               style={{
                 height: 40,
                 margin: 12,
                 borderBottomColor: "#042c54",
                 borderBottomWidth: 1,
                 padding: 10,
                }}
                placeholder="Enter Name"
                value={newName}
                onChangeText={text => setNewName(text)}
                />
                <TextInput
               style={{
                 height: 40,
                 margin: 12,
                 borderBottomColor: "#042c54",
                 borderBottomWidth: 1,
                 padding: 10,
                }}
                placeholder="Enter age"
                value={newAge}
                onChangeText={text => setNewAge(text)}
                />
                <Picker
                  selectedValue={donor}
                  onValueChange={(itemValue, itemIndex) =>
                    setDonor(itemValue)
                  }>
                  <Picker.Item label="Donor" value="Donor" />
                  <Picker.Item label="User" value="User" />
               </Picker>
                <Picker
                  selectedValue={newBloodType}
                  onValueChange={(itemValue, itemIndex) =>
                    setNewBloodType(itemValue)
                  }>
                  <Picker.Item label="A+" value="A+" />
                  <Picker.Item label="A-" value="A-" />
                  <Picker.Item label="O+" value="O+" />
                  <Picker.Item label="O-" value="O-" />
                  <Picker.Item label="AB+" value="AB+" />
                  <Picker.Item label="AB-" value="AB-" />
                  <Picker.Item label="B+" value="B+" />
                  <Picker.Item label="B-" value="B-" />
               </Picker>
              <TextInput
               style={{
                 height: 40,
                 margin: 12,
                 borderBottomColor: "#042c54",
                 borderBottomWidth: 1,
                 padding: 10,
                }}
                placeholder="County"
                value={newRegion}
                onChangeText={text => setNewRegion(text)}
                />
                  <TextInput
               style={{
                 height: 40,
                 margin: 12,
                 borderBottomColor: "#042c54",
                 borderBottomWidth: 1,
                 padding: 10,
                }}
                placeholder="Enter Phone number"
                value={newphoneNumber}
                onChangeText={text => setNewPhoneNumber(text)}
                />
          <TextInput
           style={{
             height: 40,
             margin: 12,
             borderBottomColor: "#042c54",
             borderBottomWidth: 1,
             padding: 10,
            }}
            keyboardType="email-address"
            placeholder="Enter Email"
            value={email}
            onChangeText={text => setEmail(text)}
            />
          <TextInput
           style={{
             height: 40,
             margin: 12,
             borderBottomColor: "#042c54",
             borderBottomWidth: 1,
             padding: 10,
            }}
            placeholder="Enter Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            />
        <TouchableOpacity style={{margin: 10}}>  
        <Button style={{height:40}}
        color= "#042c54"
        title="REGISTER"
        onPress={ () => {handleSignUp()}}
        />
       </TouchableOpacity>
        </ScrollView>
    </KeyboardAvoidingView>
  </View>
  )
}

export default Register


























