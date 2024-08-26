import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ADDTASK, HOME, SETTİNGS } from '../utils/routes';
import Homeİndex from '../screens/Home/Homeİndex';
import { SettingIcon } from '../components/headerRight/HeaderRight';
import { useDispatch, useSelector } from 'react-redux';
import color from '../components/color_palette/colors';
import AddTaskİndex from '../screens/AddTask/AddTaskİndex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkModeOnn, whiteModeOnn } from '../redux/actions/action';

export default function AppNavigator() {
  const mode = useSelector(state => state.settings?.mode);

  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const loadTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem("theme")
      if (theme === "darkMode") {
        dispatch(darkModeOnn())
       
      }
      else if (theme === "lightMode") {
        dispatch(whiteModeOnn())
  
      }
    } catch (error) {
      console.error('Error loading theme from AsyncStorage:', error);
    }
  }
  
  useEffect(() => {
    loadTheme();
  },[dispatch])

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: mode ? color.dark.headerBackground : color.light.headerBackground,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name={HOME}
        component={Homeİndex}
        options={{
          headerTitle: "Notes",
          headerTintColor: mode ? color.dark.ıcon : color.light.ıcon,
          headerStyle: {
            backgroundColor: mode ? color.dark.background : color.light.background,
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name={ADDTASK}
        component={AddTaskİndex}
        options={{
          headerTintColor: mode ? color.dark.ıcon : color.light.ıcon,
          headerStyle: {
            backgroundColor: mode ? color.dark.background : color.light.background,
            headerShadowVisible: false,
           
          }

        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
