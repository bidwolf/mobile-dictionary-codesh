import Icon from "@react-native-vector-icons/fontawesome6"
import { DefaultTheme } from "@theme/index"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export const Player = ({ word, phonetic }: { word: string, phonetic?: string }) => {
  return (
    <View style={styles.playerContainer}>
      <View style={{
        alignContent: 'center',
        justifyContent: 'center',
      }}>
        <Text style={styles.phoneticText}>{word}</Text>
        {phonetic && <Text>{phonetic}</Text>}
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBlock: 32,
        marginInline: 16
      }}>
        <TouchableOpacity onPress={() => { }} >
          <Icon name="circle-play" size={24} color="#8E8E8E" iconStyle="solid" />
        </TouchableOpacity>
        <View style={styles.progressBar}>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
    color: DefaultTheme.colors.text,
    textTransform: 'capitalize'
  }
})