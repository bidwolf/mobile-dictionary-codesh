import { StyleSheet, View } from "react-native"

type TableRowProps = {
  children: React.ReactNode[]
}
export const TableRow: React.FC<TableRowProps> = ({ children }) => (<View style={styles.row}>{children}</View>)
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBlock: 8,
    paddingInline: 32,
    height: 48,
    borderColor: '#D4D4D4',
    borderBottomWidth: 1,
    backgroundColor: "#FCFCFC"
  }

});
