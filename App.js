import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  TrendingScreens, Home, Chat, Notification, Account, UserChat, Groups, Recommend, UserAccount, Login, Register, RegisterUserDetails, MyChats, AdminHome, UserEmergency } from './screens';
import { DONCard, DataProvider, Gmaps} from './components';
import News from './AdminPage/News';
import Emergency from './AdminPage/Emergency';
import PostEmergencies from './AdminPage/PostEmergencies';
import PostNews from './AdminPage/PostNews';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
     
    <DataProvider> 
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AdminHome" component={AdminHome} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Gmaps" component={Gmaps} /> 
        <Stack.Screen name="DONCard" component={DONCard} /> 
        <Stack.Screen name="TrendingScreens" component={TrendingScreens} />
        <Stack.Screen name="UserEmergency" component={UserEmergency} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="UserChat" component={UserChat} />
        <Stack.Screen name="Groups" component={Groups} />
        <Stack.Screen name="MyChats" component={MyChats} />
        <Stack.Screen name="UserAccount" component={UserAccount} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="Emergency" component={Emergency} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegisterUserDetails" component={RegisterUserDetails} />
        <Stack.Screen name="PostEmergencies" component={PostEmergencies} />
        <Stack.Screen name="PostNews" component={PostNews} />
      </Stack.Navigator>
    </NavigationContainer>
    </DataProvider>
  );
}

export default App;






































































