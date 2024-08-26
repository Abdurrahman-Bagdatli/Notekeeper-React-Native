import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import color from '../../components/color_palette/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FinishIcon, RemoveIcon } from '../../components/headerRight/HeaderRight';


export default function AddTaskİndex() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const mode = useSelector(state => state.settings?.mode)
    const now = new Date().toLocaleDateString();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const route = useRoute();

    useEffect(() => {
        const id = route.params ? route.params.id : null                            
        navigation.setOptions({
            headerTitle: title.length > 0 || description.length > 0 ? "Edit Task" : "Add Task",
            headerRight:() => <FinishIcon date={now} title={title} description={description} id={id} />,
        })
    }, [dispatch,title, description, route,])

    useEffect(() => {
        if (route.params) {
            setTitle(route.params.Title)
            setDescription(route.params.Description)
        }
        else {
            console.log("Route params not found");
        }

    }, [route])


    return (
        <View style={[styles.container, { backgroundColor: mode ? color.dark.background : color.light.background }]}>
            <View style={styles.subContainer}>
                <View style={styles.titleContainer}>
                    <TextInput
                        onChangeText={setTitle}
                        value={title}
                        placeholder='Title'
                        placeholderTextColor='#333333'
                        style={[styles.textInput, { color: mode ? color.dark.Enter : color.light.Enter }]}
                    ></TextInput>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.date, { color: mode ? color.dark.ui : color.light.ui }]}>{route.params ? route.params?.Date : now}</Text>
                    <Text style={[styles.line, { color: mode ? color.dark.ui : color.light.ui }]}>  |  </Text>
                    <Text style={[styles.descriptionCount, { color: mode ? color.dark.ui : color.light.ui }]}>{description.length} character</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <TextInput
                        onChangeText={setDescription}
                        value={description}
                        placeholder='Start typing'
                        placeholderTextColor='#212121'
                        style={[styles.textInput2, { color: mode ? color.dark.Enter : color.light.Enter }]}
                    ></TextInput>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
    },
    titleContainer: {
        marginHorizontal: 15,
    },
    infoContainer: {
        marginHorizontal: 15,
        flexDirection: "row"
    },
    descriptionContainer: {
        marginHorizontal: 15,
        flex: 1,
    },
    textInput: {
        fontSize: 25,
    },
    textInput2: {
        fontSize: 15,
    },
})