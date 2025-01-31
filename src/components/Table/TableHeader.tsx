import React from "react"
import { StyleSheet, View } from "react-native"


type TableHeaderProps = {
  children: React.ReactNode[]
}
export const TableHeader: React.FC<TableHeaderProps> = ({ children }) => (
  <View style={styles.headerRow}>
    {React.Children.map(children, child => child)}
  </View>
)
const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 150,
    paddingBlock: 8,
    height: 48,
    paddingInline: 32,
    borderBottomWidth: 1,
    borderColor: '#D4D4D4',
    backgroundColor: '#F4F4F4',
  }
});
