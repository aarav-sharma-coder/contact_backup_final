import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

export default class SettingScreen extends Component{
    constructor(){
        super();
        this.state={
          emailId   : '',
          firstName : '',
          lastName  : '',
          docId     : ''
        }
      }
      //Function to get the user details
      getUserDetails = ()=>{
          var email = firebase.auth().currentUser.email;
          db.collection('users').where('email_id','==',email).get()
          .then(snapshot=>{
              snapshot.forEach(doc=>{
                  var data=doc.data
                  this.setState({
                      emailId: data.email_id,
                      firstName: data.first_name,
                      lastName: data.last_name,
                      docId: doc.id
                  })
              })
          })
      }
      //Function for updating the user profile
      updateUserDetails=()=>{
          db.collection('users').doc(this.state.docId).update({
                  "first_name": this.state.firstName,
                  "last_name": this.state.lastName
              })

          Alert.alert("Your profile has been updated successfully")
      }
      //Getting user details when component is created
      componentDidMount(){
          this.getUserDetails();
      }
    render(){
        return(
            <View style={styles.container} >
        <MyHeader title="Settings" navigation={this.props.navigation}/>
        <View style={styles.formContainer}>
          <Text style = {styles.label}>First Name</Text>
          <TextInput
              style={styles.formTextInput}
              placeholder ={"First Name"}
              maxLength ={12}
              onChangeText={(text)=>{
                this.setState({
                  firstName: text
                })
              }}
              value ={this.state.firstName}
            />
            <Text style = {styles.label}>Last Name</Text>
            <TextInput
               style={styles.formTextInput}
               placeholder={"Last Name"}
               maxLength={12}
               onChangeText={(text)=>{
                   this.setState({
                       lastName: text
                   })
               }}
               value={this.state.lastName}
               />
          </View>
            <View style = {styles.buttonView}>
                <TouchableOpacity
                  style = {styles.button}
                  onPress={()=>{
                      this.updateUserDetails()
                  }}
                >
                 <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
          </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:"#6fc0b8"
    },
    formContainer:{
      flex: 0.88,
      justifyContent:'center'
    },
    label:{
      fontSize:RFValue(18),
      color:"#717D7E",
      fontWeight:'bold',
      padding:RFValue(10),
      marginLeft:RFValue(20)
    },
    formTextInput: {
      width: "90%",
      height: RFValue(50),
      padding: RFValue(10),
      borderWidth:1,
      borderRadius:2,
      borderColor:"grey",
      marginBottom:RFValue(20),
      marginLeft:RFValue(20)
    },
    button: {
      width: "75%",
      height: RFValue(60),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: RFValue(50),
      backgroundColor: "#32867d",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop: RFValue(20),
    },
    buttonView:{
      flex: 0.22,
      alignItems: "center",
      marginTop:RFValue(100)
  },
    buttonText: {
      fontSize: RFValue(23),
      fontWeight: "bold",
      color: "#fff",
    },
  });