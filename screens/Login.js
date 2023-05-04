import { View, Text, Button, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'
import {useState, useEffect}  from "react"
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth"
import { getAuth, onAuthStateChanged } from "firebase/auth";


const Login = () => {
  const navigation = useNavigation();
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const handleSignIn = () => {
    auth
      signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.uid);
        console.log(user.email);
        if (user.email === "admin@gmail.com") {
          setIsAdmin(true);
          navigation.navigate("AdminHome");
        } else {
          setIsAdmin(false);
          navigation.navigate("Home");
        }
      })
      .catch(error => alert("Invalid Email or Password"));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        if (user.email === "admin@gmail.com") {
          navigation.navigate("AdminHome");
        } else {
          navigation.navigate("Home");
        }
      } else {
        // User is not logged in, do something else
      }
    });
  
    return unsubscribe;
  }, []);
  
  
  return ( 
    <View style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#042c54",
    }}
    >
      <KeyboardAvoidingView behavior="padding" enabled                  
       style={{
         width:"80%",
         flex: 0.4,
         backgroundColor: "#fff",
         borderRadius: 10,
        }}>
          <View style={{
           flex: 0.2
          }}> 
          <View style={{
          }}>
            <Text style={{
            alignSelf: "center",
            justifyContent:"center",
            color:"#042c54",
            fontSize: 20,
          }}>Welcome Back!</Text>
          <TextInput
          // ========================Email login=====================
           style={{
            height: 40,
            margin: 12,
            borderBottomColor: "#042c54",
            borderBottomWidth: 1,
            padding: 10,
           }}
           keyboardType="email-address"
           placeholder="Email"
           value={email}
           onChangeText={text => setEmail(text)}
          />
          <TextInput
          // =========================Password Login==================================
           style={{
            height: 40,
            margin: 12,
            borderBottomColor: "#042c54",
            borderBottomWidth: 1,
            padding: 10,
           }} 
           placeholder="Password"
           value={password}
           onChangeText={text => setPassword(text)}
           secureTextEntry
          />
          </View>
        <TouchableOpacity
        style={{
          marginLeft: 10,
          marginRight: 10,
        }} 
        >
        <Button style={{
          flex: 0.5
        }}
        color= "#042c54"
         title="login"
         onPress={handleSignIn}
        />
       </TouchableOpacity>
       <View style={{
          flexDirection:"row",
          alignItems: "center",
          justifyContent: "center",
       }}
       >
        <Text>Dont have an Account?  </Text>
        <TouchableOpacity>   
         <Text style={{
          color:"#042c54",
         }} onPress={()=> navigation.navigate("Register")}
         >Register</Text>
        </TouchableOpacity>
       </View>
       </View>
       </KeyboardAvoidingView> 
    </View>
  )
}

export default Login






      







