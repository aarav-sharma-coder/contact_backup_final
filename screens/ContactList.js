import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      contacts: []
    };
  }
  //Loading contacts from device
  loadContacts = async () => {
    const {permission} = await Contacts.requestPermissionsAsync();

    if (permission.status !== 'granted') {
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails]
    });

    console.log(data);
    this.setState({ contacts: data, inMemoryContacts: data, isLoading: false });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.loadContacts();
  }
  //Function for render item
  renderItem = ({ item }) => (
    <View style={{ minHeight: 70, padding: 5 }}>
      <Text style={{ color: '#bada55', fontWeight: 'bold', fontSize: 26 }}>
        {item.firstName + ' '}
        {item.lastName}
      </Text>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>
        {item.phoneNumbers[0].digits}
      </Text>
    </View>
  );
  //Searching for particular contact
  searchContacts = value => {
    const filteredContacts = this.state.inMemoryContacts.filter(contact => {
      let contactLowercase = (
        contact.firstName +
        ' ' +
        contact.lastName
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ contacts: filteredContacts });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ backgroundColor: '#2f363c' }} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#dddddd"
          style={{
            backgroundColor: '#2f363c',
            height: 50,
            fontSize: 36,
            padding: 10,
            color: 'white',
            borderBottomWidth: 0.5,
            borderBottomColor: '#7d90a0'
          }}
          onChangeText={value => this.searchContacts(value)}
        />
        <View style={{ flex: 1, backgroundColor: '#2f363c' }}>
          {this.state.isLoading ? (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ActivityIndicator size="large" color="#bad555" />
            </View>
          ) : null}
          <FlatList
            data={this.state.contacts}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 50
                }}
              >
                <Text style={{ color: '#bad555' }}>No Contacts Found</Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

