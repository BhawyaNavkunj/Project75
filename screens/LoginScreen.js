import React from 'react';
import {View,Text,TextInput,TouchableOpacity,KeyboardAvoidingView,StyleSheet,Image} from 'react-native';

export default class LoginScreen extends React.Component{
  constructor(){
    super()
    this.state={
      email:'',
      password:''
    }
  }

  loginUser=async(email,password)=>{
    if(email && password){
    try{
      const response = await firebase.auth().signInWithEmailAndPassword(email,password)
      if(response){
        this.props.navigation.navigate("WriteStoryScreen")
      }
    }
    catch(error){
      switch(error.code){
        case 'auth/user-not-found':
        alert("User does not exist.")
        break;

        case 'auth/invalid-email':
        alert("Incorrect email or password.")
        break;
      }
    }
  }

  else{
    alert("Enter email and password.")
  }
  }

  render(){
    return(
      <KeyboardAvoidingView style={{alignItems:"center",margin:20}}>
      <View>
                    <Image
                    source = {require('../logo.png')}
                    style  = {styles.image}/>
                    </View>
      <View>
      <TextInput style={styles.loginBox}
      placeholder="Enter email id"
      keyboardType="email-address"
      onChangeText={(text)=>{this.setState({
        email:text
      })}}
      />
      <TextInput style={styles.loginBox}
      placeholder="Enter password"
      secureTextEntry={true}
      onChangeText={(text)=>{this.setState({
        password:text
      })}}
      />
      </View>
      <TouchableOpacity style={styles.loginButton}
      onPress={()=>{this.loginUser(this.state.email,this.state.password)}}>
      <Text>Login</Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  loginBox:{
    width:200,
    height:30,
    borderWidth:1,
    fontSize:14,
    margin:20
  },
  loginButton:{
    width:90,
    height:25,
    borderWidth:1,
    marginTop:10,
    borderRadius:5,
    backgroundColor:"lightblue",
    textAlign:"center",
  },
  image:{
    width:150,
    height:150
  }
})