import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [useManual, setUseManual] = useState(false); // Estado para cambiar entre manual y automático
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

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

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        ¿Cómo deseas ingresar las coordenadas?
      </Text>

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
    </View>
  );
}


