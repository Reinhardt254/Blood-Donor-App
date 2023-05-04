import { View, Text,TouchableOpacity, Image, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { DonBType, DonName, DonCounty, DONDate } from './SubInfo';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../useContext/DataContext';
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { ScrollView } from 'react-native';
import { auth, db } from '../firebaseConfig';

const DONCard = () => {
  const { data } = useContext(DataContext);
  const navigation = useNavigation();
  const [compatibleDonors, setCompatibleDonors] = useState([]);
  auth
  //===============Algorithm============
  const userId = auth.currentUser.uid
// Get the user's blood type from the database

useEffect(() => {
  const fetchData = async () => {
    try {
      const userSnapshot = await getDoc(doc(db, "BloodDonors", userId));
      const userBloodType = userSnapshot.data().bloodType;

      const aboCompatibility = {
        O: ["O+", "O-"],
        A: ["A+", "A-", "O+", "O-"],
        B: ["B+", "B-", "O+", "O-"],
        AB: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      };
      const rhCompatibility = {
        "+": ["+", "-"],
        "-": ["-"],
      };

      const querySnapshot = await getDocs(collection(db, "BloodDonors"));
      const donors = [];
      querySnapshot.forEach((doc) => {
        const donorBloodType = doc.data().bloodType;
        if (donorBloodType.includes("+") || donorBloodType.includes("-")) {
          const donorABO = donorBloodType 
          const [donorABOS, donorRh] = donorBloodType.match(/^([ABO]+)([+-])$/).slice(1);
          const [userABO, userRh] = userBloodType.match(/^([ABO]+)([+-])$/).slice(1);
          // console.log(userRh)
          if (
            aboCompatibility[userABO].includes(donorABO) &&
            rhCompatibility[userRh].includes(donorRh)
          ) {
            donors.push(doc.data());
          }
        }
      });
      setCompatibleDonors(donors);
    } catch (error) {
      console.error(error);
      // Display a helpful error message to the user
      // (e.g. "Failed to fetch compatible donors. Please try again later.")
    }
  };
  fetchData();
}, [userId, db]);


  //============End=====================

  return (
    <View style={{flex: 1}}>
      <View style={{flex:0.3}}>
        <Text style={{
          marginLeft: 10,
          marginTop:5, 
          color:"#042c54",
          fontSize: 15,
          fontWeight:'bold',
        }}>
          Recommended
        </Text>
        <ScrollView
         horizontal={true} 
         pagingEnabled={true}
         >
         {compatibleDonors.map((data)=>( 
          <TouchableOpacity style={{
            flexDirection:"row",
            alignItems:"center",
            justifyContent:"center",
           }}
           onPress={() => navigation.navigate("UserAccount", {data})}
           >
            <View style={{
                 marginBottom: 10,
                 marginLeft: 10,
                 marginRight:20,
                 marginTop:10,
                 borderRadius: 10,
                 backgroundColor: "#fff",
                 height: "90%",
                 width: 300,
                 borderWidth:1,
                 borderColor:"#ccc",
            }}>
              <View style={{
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between",
                flex: 1,
              }}>
              
                <Image key={data.id} source=  {{uri: data.url} || require('../assets/images/Profile.jpg')}
                style={{
                  height: "90%",
                  borderRadius: 10,
                  width:"50%",
                  marginLeft: 10,
                }}
                />      
                <View style={{
                   height:"80%",
                   borderRadius: 10,
                   width:"40%",
                   marginLeft: 10,
                   marginTop: 10,
                }}>
                  <Text style={{
                           color:"#042c54",
                           fontSize: 15,
                           fontWeight:'bold',
                  }}>{data.name}</Text>
                  <Text style={{
                           color:"#042c54",
                           fontSize: 15,
                           fontWeight:'bold',
                  }}>{data.bloodType}</Text>
                  <Text style={{ 
                           color:"#042c54",
                           fontSize: 15,
                           fontWeight:'bold',
                  }}>{data.region}</Text>
                   <Text style={{ 
                           color:"#042c54",
                           fontSize: 15,
                           fontWeight:'bold',
                  }}>{data.userType}</Text>
                </View>
              </View>
            </View>
           </TouchableOpacity>
        ))}
        </ScrollView>
      </View> 
    <View style={{flex: 0.7}}>
    <ScrollView 
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    >  
    <View style={{
      backgroundColor: "#ccc",
      flex:0.8,
    }}>  
      <Text style={{
        marginLeft: 10,
        marginTop:10, 
        color:"#042c54",
        fontSize: 15,
        fontWeight:'bold',
      }}>Users</Text> 
    <View style={{
      margin: 5,
    }}>
      {data.map(data=>(
       <TouchableOpacity onPress={() => navigation.navigate("Chat", {data})}> 
      <View style={{
      backgroundColor:"#fff", 
      borderRadius: 5,
      marginBottom: 5,
      marginTop: 5,
      width: "100%",
      height: 100,
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}>
        <TouchableOpacity style={{
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 5,
        }}
        onPress={() => navigation.navigate("UserAccount", {data})}
        >
          <Image key={data.uid} source=  { {uri: data.url} || require('../assets/images/Profile.jpg')}
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
          }}
          />
        </TouchableOpacity>
        <View style={{
          width: "80%",
          margin: 10,
          marginLeft: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        }}>                  
        <DonName name={data.name}/>
        <DonBType bType={data.bloodType}/>
        <DonCounty county={data.userType}/>
        </View>
     </View>
    </View>
      </TouchableOpacity>  
      ))}
   </View>
   </View>  
   </ScrollView>
   </View>
   </View>
  )
}

export default DONCard













