import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 24,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
  google: {
    backgroundColor: 'white',
    padding: 16,
    width: '100%',
    flexDirection: 'row',
    gap: 16,
    borderRadius: 16,
    elevation: 6,
    shadowColor: '#000000',
    shadowOpacity: 0.8

  },
  googleText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 600
  }
});
