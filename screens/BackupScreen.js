import React, { Component } from "react";
import {
  Platform,
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
import{Contacts} from 'react-native-contacts'
import {Linking} from 'react-native'

export default class WelcomeScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            date:"",
            userId:firebase.auth().currentUser.email,
            contact:[]
        }
    }
    //Getting the contacts from device
    getContact(){
      Contacts.checkPermission((error,res)=>{
        if(res='authorized'){
            Contacts.getAll((err,contact)=> this.setState({contact}));
        }
      })
    
    }
    //Storing the user contacts in the database
    backup=()=>{
        db.collection("contactList").update({
          "Contacts": contact
        })
    }
    //Last backup Notification
    sendNotification = () => {
       
        db.collection("users")
          .where("email_id", "==", this.state.userId)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              var name = doc.data().first_name;
              var lastName = doc.data().last_name;
    
             
              db.collection("Notifications")
                .get()
                .then((snapshot) => {
                  snapshot.forEach((doc) => {
                   date= doc.data().date;
    
                    //targert user id is the donor id to send notification to the user
                    db.collection("Notifications").add({
                      message:
                        "Last backup was on:"+ date,
                    });
                  });
                });
            });
          });
      };
      //Getting the contacts after component is made
      componentDidMount(){
        this.getContacts()
      }
    render(){
        return(
            <View style={styles.container} >
        <MyHeader title="Backup Screen" navigation={this.props.navigation}/>
        <View style={styles.formContainer}>
            <TouchableOpacity
            style = {styles.Button}
            onPress={() => this.sendNotification(),
                this.backup()
            }
            >
                <Text style={styles.buttonText}>Backup</Text>
            </TouchableOpacity>
            <View>
                <TouchableOpacity
                style={styles.button}
                onPress={()=>Linking.openURL('mailto:support@example.com?subject=sendMail&body='+contact)}
                        
                >
                 <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
            </View>
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
    button: {
        width: "80%",
        height: RFValue(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(25),
        backgroundColor: "#ffff",
        shadowColor: "#000",
        marginBottom:RFValue(10),
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10.32,
        elevation: 16,
      },
      buttonText: {
        color: "#32867d",
        fontWeight: "200",
        fontSize: RFValue(20),
      },
})