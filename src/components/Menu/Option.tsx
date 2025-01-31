import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export const MenuOption = ({
  onSelect,
  children,
}: {
  onSelect: () => void;
  children: React.ReactNode;
}) => {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.menuOption}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuOption: {
    padding: 8,
    flexDirection: 'row',
    gap: 8,
    alignContent: 'center',
  },
})