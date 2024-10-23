import React, {useState} from "react";
import { Alert, Button, TextInput, View } from "react-native";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB_TEgHOWDR8wLiW61cxhG4kX7vdDsXZfM",
  authDomain: "meuprimeirofirebase-8b811.firebaseapp.com",
  projectId: "meuprimeirofirebase-8b811",
  storageBucket: "meuprimeirofirebase-8b811.appspot.com",
  messagingSenderId: "862046580333",
  appId: "1:862046580333:web:2680d9841e5d26ad4f9964",
  measurementId: "G-M4DVN3KD2D"
};

firebase.initializeApp(firebaseConfig);

const App = () => {
  const [nome, setNome] = useState(''); 
  const [sobrenome, setSobrenome] = useState('');
  
  const sendData = async () => {
    const nomesCollection = firebase.firestore().collection('nomes'); 
    try {
      await nomesCollection.add({
        Nome: nome, 
        Sobrenome: sobrenome
       });
        
      Alert.alert('Sucesso', 'Dados cadastrados com sucesso!')
      setNome(''); 
      setSobrenome('');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar os dados.');
    }
};


  return (
    <View>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Sobrenome"
        value={sobrenome}
        onChangeText={setSobrenome}
      />

      <Button title="Cadastrar" onPress={sendData}
      />

    </View>
  );
};
export default App;
