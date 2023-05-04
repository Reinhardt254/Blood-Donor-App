import {useEffect, useState} from "react"
import { View, SafeAreaView, FlatList, Text, Image} from "react-native"
import {HomeHeader, FocusedStatusBar, DONCard, HomeFooter, Gmaps, Map, NewsHome,} from "../components";
import { useRoute } from "@react-navigation/native";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Home = () => {
  const Tab = createMaterialTopTabNavigator();
  const bloodDonorsCollectionRef = collection(db, "BloodDonors")
  const [data, setData] = useState([])

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
           <View style={{flex:0.8}}>
             <Tab.Navigator 
              screenOptions={{
                tabBarActiveTintColor: '#042c54',
                tabBarInactiveTintColor: 'gray',
                tabBarstyle: { backgroundColor: 'white' },
                tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
                tabBarItemStyle: { paddingVertical: 10 },
              }}
             >
               <Tab.Screen name="Map" component={Gmaps} />
               <Tab.Screen name="List" component={DONCard}/>
               <Tab.Screen name="News" component={NewsHome}/>
           </Tab.Navigator>
            </View>
            <View style={{
                flex: 0.1,
            }}>
               <HomeFooter data={data}/>
            </View>
        </SafeAreaView>
    
  )
}

export default Home
















