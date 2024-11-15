// src/screens/HomeScreen.tsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import BluetoothToggle from '../components/BluetoothToggle';
import { useBluetooth } from '../hooks/useBluetooth';

const HomeScreen: React.FC = () => {
  const { isBluetoothEnabled, statusMessage, toggleBluetooth } = useBluetooth();

  return (
    <View style={styles.container}>
      <BluetoothToggle
        isBluetoothEnabled={isBluetoothEnabled}
        statusMessage={statusMessage}
        onToggleBluetooth={toggleBluetooth}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default HomeScreen;
