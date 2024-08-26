import { FlatList, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import React, { useEffect, useCallback, useState } from 'react';
import color from '../../components/color_palette/colors';
import { useDispatch, useSelector } from 'react-redux';
import { AddCircle } from 'iconsax-react-native';
import { ADDTASK, SETTİNGS } from '../../utils/routes';
import { useFocusEffect, useNavigation, } from '@react-navigation/native';
import { getItemsFromDatabase } from '../../axios/axios';
import { fetch_Task } from '../../redux/actions/action';
import LottieView from 'lottie-react-native';
import { darkModeOnn, whiteModeOnn } from '../../redux/actions/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeIndex() {
  const mode = useSelector(state => state.settings?.mode);
  const data = useSelector(state => state.tasks?.taskList);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(mode);
  const [isloading, setIsloading] = useState(true);

  const toggleSwitch = async () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    if (newValue) {
      dispatch(darkModeOnn());
      await AsyncStorage.setItem("theme", "darkMode")
    } else {
      dispatch(whiteModeOnn());
      await AsyncStorage.setItem("theme", "lightMode")
    }
  };
  const loadTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem("theme")
      if (theme === "darkMode") {
        dispatch(darkModeOnn())
        setIsEnabled(true)
      }
      else if (theme === "lightMode") {
        dispatch(whiteModeOnn())
        setIsEnabled(false)
      }
    } catch (error) {
      console.error('Error loading theme from AsyncStorage:', error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      
      const fetchData = async () => {
        try {
          const response = await getItemsFromDatabase();
          dispatch(fetch_Task(response));
          console.log("RESPONSE:   ", response);
        } catch (error) {
          console.error('Error fetching items from database:', error);
        }
        finally{
          setIsloading(false)
        }
      };
      fetchData();
    }, [dispatch])
  );
  useEffect(() => {
    loadTheme();
    setIsEnabled(mode);
    navigation.setOptions(
      {
        headerRight: () => (

          <Switch
            trackColor={{ false: '#767577', true: '#767577' }}
            thumbColor={isEnabled ? '#FFD700' : '#FFFFFF'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />

        )
      }
    );
  }, [mode, isEnabled]);
  const renderListEmptyComponent = () => (
    <View style={[styles.isEmptContainer, { color: mode ? color.dark.title : color.light.title }]}>
      <LottieView source={require('../../components/animations/hUfGpRcX01.json')} autoPlay loop={true} style={styles.animation} speed={0.5} />
      <Text style={[styles.notFoundText, { color: mode ? color.dark.title : color.light.title }]}>Note not found</Text>
    </View>
  )
  if (isloading === true) {
    return (
      <SafeAreaView style={[styles.loadingContainer, { backgroundColor: mode ? color.dark.background : color.light.background }]}>
        <ActivityIndicator size={50} color={"gray"}></ActivityIndicator>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: mode ? color.dark.background : color.light.background }]}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        style={{ flex: 1 }}
        ListEmptyComponent={() => renderListEmptyComponent()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate(ADDTASK, { id: item.id, Title: item.Title, Description: item.Description, Date: item.Date })}>
            <View style={[styles.itemContainer, { backgroundColor: mode ? color.dark.itemBackground : color.light.itemBackground }]}>
              <View style={styles.textContainer}>
                <Text style={[styles.title, { color: mode ? color.dark.title : color.light.title }]}>{item.Title}</Text>
                <Text style={[styles.text, { color: mode ? color.dark.text : color.light.text }]}>{item.Description}</Text>
                <Text style={[styles.date, { color: mode ? color.dark.date : color.light.date }]}>{item.Date}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.addButton}>
          <TouchableOpacity onPress={() => navigation.navigate(ADDTASK)}>
            <AddCircle size="70" color="#ffa500" variant="Bold" />
          </TouchableOpacity>
        </View>
      </View>



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'flex-start',

  },
  textContainer: {
    margin: 20,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    right: "6%",
    bottom: "4%"
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    paddingVertical: 10
  },
  date: {
    fontSize: 14,
    fontWeight: "500"
  },
  addButton: {
    zIndex: 1,
    position: "absolute",
    borderRadius: 37,
  },
  isEmptContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  notFoundText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",

  },
  animation: {
    width: 250,
    height: 250,
  },
});
