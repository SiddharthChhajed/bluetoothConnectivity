// src/hooks/useBluetooth.ts
import { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';

export const useBluetooth = () => {
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState<boolean | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  useEffect(() => {
    requestBluetoothPermission().then(() => {
      BluetoothStateManager.getState().then((state) => {
        setIsBluetoothEnabled(state === 'PoweredOn');
      });
    });
  }, []);

  const requestBluetoothPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
          title: 'Bluetooth Permission',
          message: 'This app needs access to Bluetooth to enable/disable it.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        setStatusMessage('Bluetooth permission denied');
      }
    }
  };

  const toggleBluetooth = () => {
    if (isBluetoothEnabled) {
      BluetoothStateManager.disable()
        .then(() => {
          setIsBluetoothEnabled(false);
          setStatusMessage('Bluetooth disabled successfully');
        })
        .catch((error) => setStatusMessage(`Error disabling Bluetooth: ${error}`));
    } else {
      BluetoothStateManager.enable()
        .then(() => {
          setIsBluetoothEnabled(true);
          setStatusMessage('Bluetooth enabled successfully');
        })
        .catch((error) => setStatusMessage(`Error enabling Bluetooth: ${error}`));
    }
  };

  return { isBluetoothEnabled, statusMessage, toggleBluetooth };
};
