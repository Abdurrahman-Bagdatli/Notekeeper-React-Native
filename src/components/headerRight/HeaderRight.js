import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Setting, TickCircle, NoteRemove, Vibe } from 'iconsax-react-native';
import { useNavigation } from '@react-navigation/native';
import { HOME, SETTİNGS } from '../../utils/routes';
import { useSelector } from 'react-redux';
import color from '../color_palette/colors';
import { addItemsToDatabase, removeItemsFromDatabase, updateItemsFromDatabase } from '../../axios/axios';

export const FinishIcon = ({ id, title, date, description }) => {
  const mode = useSelector(state => state.settings?.mode);
  const navigation = useNavigation();

  const handlePress = async () => {
    if (id) {
      try {
        console.log(id);
        await removeItemsFromDatabase(id);
        navigation.navigate(HOME);
      } catch (error) {
        console.error('Error:', error.message);
      }
    } else {
      Alert.alert(
        "Error",
        "To delete, you must first create a note.",
        [{ text: "Okey" }]
      );
    }
  };

  const pressed = async () => {
    const item = {
      Title: title,
      Description: description,
      Date: date,
      id: id
    };

    try {
      let data;
      if (title.length > 0 || description.length > 0) {
        if (id) {
          data = await updateItemsFromDatabase(item);
          console.log('Items updated successfully:', data);
        } else {
          data = await addItemsToDatabase(item);
          console.log('Items added successfully:', data);
        }
        navigation.navigate(HOME);
      }
      else{
        Alert.alert(
          "Error",
          "To add something, you must first write something.",
          [{ text: "Okey" }]
        );
      }
      
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.removeButton}>
        <NoteRemove size="37" color="#f47373" variant="Bold" />
      </TouchableOpacity>
      <TouchableOpacity onPress={pressed} style={styles.addButton}>
        <TickCircle size="37" color={mode ? color.dark.ıcon : color.light.ıcon} variant="Bold" />
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  removeButton: {
    padding: 5,
  },
  addButton: {
    padding: 5,
  }
})