import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native"

const Apploader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView source={require("../assets/anime/Loading.json.json")} autoPlay loop/>
    </View>
  )
};

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#042c54",
        zIndex:1,
    }
})

export default Apploader























