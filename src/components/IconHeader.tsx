import React from "react";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";

type IconHeaderProps = {
  FaIcon: React.ReactElement;
  backgroundColor: string;
  title: string;
  description?: string;
};

export const IconHeader: React.FC<IconHeaderProps> = ({ FaIcon, backgroundColor: color, title, description }) => {
  const theme = useTheme();
  return (
    <>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color,
        opacity: 0.5,
        paddingBlock: 20,
        paddingInline: 24,
        borderRadius: 99999
      }}>
        {FaIcon}
      </View>
      <Text style={[styles.text, {
        color: theme.colors.text
      }]}>{title}</Text>
      {
        description && <Text style={{
          fontSize: 12,
          fontWeight: theme.fonts.medium.fontWeight,
          fontFamily: theme.fonts.medium.fontFamily,
          color: theme.colors.text,
        }}>{description}</Text>
      }
    </>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 36,
    fontWeight: 'bold',
  },
})