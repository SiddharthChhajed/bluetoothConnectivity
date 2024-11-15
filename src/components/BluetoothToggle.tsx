// src/components/BluetoothToggle.tsx

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface BluetoothToggleProps {
  isBluetoothEnabled: boolean | null;
  statusMessage: string;
  onToggleBluetooth: () => void;
}

const BluetoothToggle: React.FC<BluetoothToggleProps> = ({
  isBluetoothEnabled,
  statusMessage,
  onToggleBluetooth,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        Bluetooth is {isBluetoothEnabled ? 'Enabled' : 'Disabled'}
      </Text>
      <Button
        title={isBluetoothEnabled ? 'Disable Bluetooth' : 'Enable Bluetooth'}
        onPress={onToggleBluetooth}
      />
      {statusMessage ? <Text style={styles.message}>{statusMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  status: {
    fontSize: 18,
    marginBottom: 10,
  },
  message: {
    fontSize: 14,
    color: 'gray',
    marginTop: 10,
  },
});

export default BluetoothToggle;
