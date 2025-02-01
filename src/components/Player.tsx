import * as React from "react"
import Icon from "@react-native-vector-icons/fontawesome6"
import { DefaultTheme } from "@theme/index"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { playTTS } from "@events/ttsListeners"
import { Animated } from 'react-native';

export const Player = ({ word, phonetic }: { word: string, phonetic?: string }) => {
  const [progress, setProgress] = React.useState(0);
  const progressAnim = React.useRef(new Animated.Value(0)).current;


  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [progress]);
  const onPlay = () => {
    playTTS(word)
    setProgress(1)
    setTimeout(() => {
      setProgress(0)
    }, 1000)

  }
  return (
    <View style={styles.playerContainer}>
      <View style={{
        alignContent: 'center',
        justifyContent: 'center',
      }}>
        <Text selectable style={styles.phoneticText}>{word}</Text>
        {phonetic && <Text selectable style={{
          ...styles.phoneticText,
          color: "#ccc",
          fontSize: DefaultTheme.fontsize.m,
          textTransform: 'none',
          textAlign: 'center'
        }}>{phonetic}</Text>}
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBlock: 32,
        marginInline: 16
      }}>
        <TouchableOpacity onPress={onPlay} >
          <Icon name="circle-play" size={24} color="#fff" iconStyle="solid" />
        </TouchableOpacity>
        <View style={styles.progressBarBackground}>
          <Animated.View style={[styles.progressBar, {
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%']
            })
          }]} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  progressBarBackground: {
    height: 4,
    width: '100%',
    backgroundColor: "#ccc",
    borderRadius: 16
  },
  progressBar: {
    height: 4,
    flexDirection: "row",
    width: '100%',
    backgroundColor: "#F5F5F5",
    borderRadius: 16
  },
  playerContainer: {
    width: '100%',
    margin: 16,
    padding: 16,
    gap: 16,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#B8A6B2'
  },
  phoneticText: {
    fontFamily: DefaultTheme.fonts.bold.fontFamily,
    fontSize: DefaultTheme.fontsize.l,
    fontWeight: DefaultTheme.fonts.bold.fontWeight,
    color: "#FEFEFF",
    textTransform: 'capitalize'
  }
})