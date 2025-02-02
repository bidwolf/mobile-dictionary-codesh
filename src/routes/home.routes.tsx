import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoritesScreen from '@screens/Favorites';
import HistoryScreen from '@screens/History';
import HomeScreen from '@screens/Home';
import WordsScreen from '@screens/Words';
import Icon from '@react-native-vector-icons/fontawesome6';
import { Text } from 'react-native';

const HomeStack = createBottomTabNavigator({
  screenOptions: ({ route }) => ({
    headerShown: false,
    tabBarIconStyle: {
      width: 96,
    },
    tabBarIcon: ({ focused, color, size }) => {
      const icons: { [key in 'HomeScreen' | 'WordsScreen' | 'FavoritesScreen' | 'HistoryScreen']: 'house' | 'book' | 'heart' | 'clock' } = {
        HomeScreen: 'house',
        WordsScreen: 'book',
        FavoritesScreen: 'heart',
        HistoryScreen: 'clock',
      };
      const labels: { [key in 'HomeScreen' | 'WordsScreen' | 'FavoritesScreen' | 'HistoryScreen']: string } = {
        HomeScreen: 'Home',
        WordsScreen: 'Words',
        FavoritesScreen: 'Favorites',
        HistoryScreen: 'History',
      };
      const label = labels[route.name as keyof typeof labels];
      const iconName: 'house' | 'book' | 'heart' | 'clock' = icons[route.name as keyof typeof icons];
      return !focused
        ? (<Icon name={iconName} iconStyle='solid' color={color} size={size} testID={route.name} />)
        : <Text style={{
          color: color,
          fontSize: 16,
          fontFamily: 'Roboto',

        }} >{label}</Text>
    },
  }),
  screens: {
    HomeScreen: {
      screen: HomeScreen,
      options: {
        tabBarLabel: 'Home',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "#F0F4FE",
      }
    },
    WordsScreen: {
      screen: WordsScreen,
      options: {
        tabBarLabel: 'Words',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "#F0F4FE",
      },
    },
    FavoritesScreen: {
      screen: FavoritesScreen,
      options: {
        tabBarLabel: 'Favorites',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "#F0F4FE",
      }
    },
    HistoryScreen: {
      screen: HistoryScreen,
      options: {
        tabBarLabel: 'History',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveBackgroundColor: "#F0F4FE",

      }
    }
  },
});

export default HomeStack;