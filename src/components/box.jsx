import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Box = () => {
  return (
    <View style={styles.box}>
      <Text>Box</Text>
    </View>
  );
};

export default Box;

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#2a5bd7',
    justifyContent: 'center',  
    alignItems: 'center',      
    borderRadius: 10,
  },
});
