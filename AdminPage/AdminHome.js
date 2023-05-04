import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig';


const AdminHome = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
    .signOut()
    .then(()=>{
      navigation.replace("Login")
    })
    .catch(error => {"An error happened"})
  }

  

  return (
 <View style={{flex:1}}> 
   <View style={{flex:0.1}}> 
   <AdminHeader />
   </View>
  <View style={{flex:0.85}}>
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}
       onPress={() => navigation.navigate("Emergency")}
       >
        <Text style={styles.buttonText}>Blood Emergency</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} 
      onPress={() => navigation.navigate("News")}
      >
        <Text style={styles.buttonText}>News</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} >
        <Text style={styles.buttonText}>User Verifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  </View> 
    <View style={{flex:0.05}}>
      <AdminFooter />
    </View>
    </View> 
  );
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
    height: "15%",
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

export default AdminHome;





































