/* eslint-disable react/react-in-jsx-scope */
import { createStackNavigator } from '@react-navigation/stack';
import { ENavigationScreen } from 'App/enums/navigation';
import InputPhoneNumberScreen from './InputPhoneNumberScreen';
import InputNewPasswordScreen from './InputNewPasswordScreen';
import OTPScreen from '../OTP';

const Stack = createStackNavigator();

const ForgotPasswordNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ENavigationScreen.INPUT_PHONE_NUMBER_SCREEN}>
      <Stack.Screen
        options={{ headerShown: false }}
        name={ENavigationScreen.INPUT_PHONE_NUMBER_SCREEN}
        component={InputPhoneNumberScreen}
      />
      <Stack.Screen options={{ headerShown: false }} name={ENavigationScreen.OTP_SCREEN} component={OTPScreen} />
      <Stack.Screen
        options={{ headerShown: false }}
        name={ENavigationScreen.INPUT_NEW_PASSWORD_SCREEN}
        component={InputNewPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default ForgotPasswordNavigator;
