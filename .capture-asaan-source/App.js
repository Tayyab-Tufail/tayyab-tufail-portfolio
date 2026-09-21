// Capture harness: original screen components, original empty AppProvider state.
// Only the initial route changes; no authentication or backend responses are fabricated.
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppProvider } from './src/Components/AppContext';
import Welcome from './src/screens/WelcomeScreen';
import Login from './src/screens/LoginScreen';
import Signup from './src/screens/SignupScreen';
import CustomerSignup from './src/screens/CustomerSignupScreen';
import CustomerLogin from './src/screens/CustomerLoginScreen';
import ProfessionalSignup from './src/screens/ProfessionalSignupScreen';
import ProfessionalLogin from './src/screens/ProfessionalLoginScreen';
import Select from './src/screens/SelectScreen';
import ForgotPassword from './src/screens/ForgotPasswordScreen';
import ChangePassword from './src/screens/ChangepasswordScreen';
import NewServiceScreen from './src/screens/NewServiceScreen';
import SubService from './src/screens/SubService';
import PersonalInformation from './src/screens/PersonalInformationScreen';
import PostJobScreen from './src/screens/PostJobScreen';
import TermsAndConditions from './src/screens/TermsAndConditionsScreen';
const screens = {Welcome,Login,Signup,CustomerSignup,CustomerLogin,ProfessionalSignup,ProfessionalLogin,Select,ForgotPassword,ChangePassword,NewServiceScreen,SubService,PersonalInformation,PostJobScreen,TermsAndConditions};
const Stack = createStackNavigator();
export default function App(){
  const requested = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('screen') : 'Welcome';
  const first = screens[requested] ? requested : 'Welcome';
  return <AppProvider><NavigationContainer><Stack.Navigator initialRouteName={first}>{Object.entries(screens).map(([name,component])=><Stack.Screen key={name} name={name} component={component} options={{headerShown:name!=='Welcome',title:name.replace(/Screen$/,'').replace(/([a-z])([A-Z])/g,'$1 $2')}} />)}</Stack.Navigator></NavigationContainer></AppProvider>;
}
