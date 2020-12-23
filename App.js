import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Image, Text, TextInput, View, Button, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const Login = ({ navigation }) => {

  const [text, setText] = useState('');
  const [contra, setContra] = useState('');
  const createThreeButtonAlert = () =>
    Alert.alert(
      "Error",
      "Usuario o Contraseña incorrectos",
      [
        {
          text: "Ok",
          style: "cancel"
        }
      ],
      { cancelable: false }
    );

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('./Images/ambulance.png')}
      />
      <Text style={styles.text}>Usuario</Text>
      <TextInput
        style={styles.input} name="username"
        onChangeText={(text) => setText(text)}
        defaultValue={text}
        value={text}
      ></TextInput>
      <Text style={styles.text}>Contraseña</Text>
      <TextInput
        style={styles.input} name="password"
        secureTextEntry={true}
        onChangeText={(contra) => setContra(contra)}
        defaultValue={contra}
        value={contra}
      ></TextInput>
      <Button
        title={"Aceptar"}
        onPress={() => {
          if (text == "Santiago" && contra == "1234") {
            navigation.navigate("Home")
          } else {
            setText('')
            setContra('')
            createThreeButtonAlert();
          }
        }
        }
      >
      </Button>
    </View>
  );
}




const Home = () => {
  
  navigator.geolocation.getCurrentPosition(position => {
    //console.log(position.coords.latitude)
    const initialPosition = JSON.stringify(position);
    setLat((position.coords.latitude));
    setLng((position.coords.longitude))
    
  })
  
  const createThreeButtonAlert2 = () =>
    Alert.alert(
      "Su Ambulancia ha sido Solicitada y llegara en breve",
      "",
      [
        {
          text: "Ok",
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  
  async function solicitar(data = {}) {
    console.log(lat)
    console.log(lng)
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const response = await fetch('http://ec2-54-152-27-105.compute-1.amazonaws.com:3000/Usuario', {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        //Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      },
      //redirect: 'follow', // manual, *follow, error
      credentials: 'same-origin', // include, *same-origin, omit
      body: JSON.stringify(data)
    })
    createThreeButtonAlert2()
    return response.json();
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text2}>¿Tienes una Emergencia?</Text>
      <Text style={styles.text2}>Solicita una ambulancia</Text>
      <Button
        title={"Solicitar"}
        onPress={() => {
          solicitar({
            Cedula: 1, Nombre: "Santiago",
            Latitud: lat,
            Longitud: lng,
            Fecha: "03/11/2020",
            Hora: "11:34"
          }).then(data => {
            console.log(data)
          })
          
          //navigation.navigate("Security", { name: route.params.name })
        }}
      >
      </Button>

    </View>
  );
}

const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Home"
          component={Home}
        />
        {/*
        <Stack.Screen
          name="Security"
          component={Security}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  text2: {
    fontWeight: "600",
    fontSize: 22,
    marginBottom: 15
  },
  input: {
    paddingLeft: 10,
    width: '100%',
    height: 40,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 15,
    fontWeight: "600",
    fontSize: 22
  },
  logo: {
    width: 66,
    height: 58,
  },
  but: {
    marginTop: 10,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 10
  }
});
