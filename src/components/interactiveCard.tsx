import React from "react";
import { useTheme } from "@react-navigation/native";
import { DefaultTheme } from "@theme/index";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type InteractiveCardProps = {
  title: string;
  onPress: () => void;
  navigateToScreen: () => void;
  word: string;
  navigateAction: string;
  action: string;
  variant?: 'primary' | 'secondary';
}
export const InteractiveCard = ({ title, onPress, word, action, navigateAction, navigateToScreen, variant = 'primary' }: InteractiveCardProps) => {
  const theme = useTheme()
  return (
    <>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>
      <View style={{
        gap: 4,
        width: '90%',
        alignSelf: 'center',
      }}>
        <View style={{
          backgroundColor: variant === 'primary' ? '#E1FFE2' : '#FFECEA',
          padding: 24,
          borderRadius: 8,
          marginVertical: 8
        }}>
          <Text style={styles.text}>
            {word}
          </Text>
          <TouchableOpacity
            onPress={onPress}
            style={{
              padding: 8,
              borderRadius: 8,
              borderWidth: 0.3,
              backgroundColor: '#fff',
              borderColor: variant === 'primary' ? '#269D2A' : '#FF6B6B',
              marginVertical: 8,
            }}>
            <Text style={{
              color: variant === 'primary' ? '#269D2A' : '#FF6B6B',
              textAlign: 'center',
              fontFamily: theme.fonts.bold.fontFamily,
              fontSize: theme.fontsize.s,
              fontWeight: theme.fonts.bold.fontWeight
            }}
            >
              {action}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={navigateToScreen}
          style={{
            padding: 8,
            borderRadius: 8,
            marginVertical: 8,
            backgroundColor: variant === 'primary' ? '#269D2A' : '#FF6B6B',
          }}>
          <Text style={{
            textAlign: 'center',
            color: '#fff',
            fontFamily: theme.fonts.bold.fontFamily,
            fontSize: theme.fontsize.s,
            fontWeight: theme.fonts.bold.fontWeight
          }}
          >
            {navigateAction}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: DefaultTheme.fontsize.m,
    color: '#0000007F',
    fontWeight: DefaultTheme.fonts.regular.fontWeight,
    fontFamily: DefaultTheme.fonts.regular.fontFamily,
  },
  text: {
    fontSize: DefaultTheme.fontsize.m,
    color: '#000',
    fontWeight: DefaultTheme.fonts.medium.fontWeight,
    fontFamily: DefaultTheme.fonts.medium.fontFamily,
    textAlign: 'center',
    textTransform: 'capitalize'
  },
});