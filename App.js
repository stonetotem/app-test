import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';

export default function App() {
  const [useManual, setUseManual] = useState(false); // Alternar entre manual y automático
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [visitorName, setVisitorName] = useState('Juan'); // Opción por defecto
  const [companyName, setCompanyName] = useState('Entel'); // Opción por defecto

  // Función para obtener coordenadas automáticamente
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'No se puede acceder a la ubicación.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude.toString());
    setLongitude(location.coords.longitude.toString());
  };

  // Función para enviar el formulario
  const handleSubmit = () => {
    if (!latitude || !longitude) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    Alert.alert(
      'Formulario enviado',
      `Datos:\n- Medición realizada por: ${visitorName}\n- Empresa: ${companyName}\n- Latitud: ${latitude}\n- Longitud: ${longitude}`
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Formulario de Medición</Text>

      {/* Selector de quién realiza la medición */}
      <Text>¿Quién realiza la medición?</Text>
      <Picker
        selectedValue={visitorName}
        onValueChange={(itemValue) => setVisitorName(itemValue)}
        style={{ height: 50, width: 200, marginBottom: 10 }}
      >
        <Picker.Item label="Juan" value="Juan" />
        <Picker.Item label="Pedro" value="Pedro" />
        <Picker.Item label="María" value="María" />
      </Picker>

      {/* Selector de la empresa */}
      <Text>Empresa a la que se realizó la medición:</Text>
      <Picker
        selectedValue={companyName}
        onValueChange={(itemValue) => setCompanyName(itemValue)}
        style={{ height: 50, width: 200, marginBottom: 10 }}
      >
        <Picker.Item label="Entel" value="Entel" />
        <Picker.Item label="Claro" value="Claro" />
        <Picker.Item label="Movistar" value="Movistar" />
      </Picker>

      {/* Switch para cambiar entre manual y automático */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
        <Text>Automático</Text>
        <Switch value={useManual} onValueChange={setUseManual} />
        <Text>Manual</Text>
      </View>

      {/* Opción 1: Captura Automática */}
      {!useManual && (
        <View>
          <Button title="Obtener Ubicación" onPress={getLocation} />
          <Text>Latitud: {latitude}</Text>
          <Text>Longitud: {longitude}</Text>
        </View>
      )}

      {/* Opción 2: Ingreso Manual */}
      {useManual && (
        <View>
          <Text>Latitud:</Text>
          <TextInput
            style={{ borderWidth: 1, padding: 5, marginBottom: 10, width: 200 }}
            keyboardType="numeric"
            value={latitude}
            onChangeText={setLatitude}
            placeholder="Ej: -33.12345"
          />
          <Text>Longitud:</Text>
          <TextInput
            style={{ borderWidth: 1, padding: 5, marginBottom: 10, width: 200 }}
            keyboardType="numeric"
            value={longitude}
            onChangeText={setLongitude}
            placeholder="Ej: -70.54321"
          />
        </View>
      )}

      {/* Botón para enviar el formulario */}
      <Button title="Enviar Datos" onPress={handleSubmit} />
    </View>
  );
}

