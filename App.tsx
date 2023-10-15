import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Carousel from "./components/Carousel";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HorizontalSheet from "./components/HorizontalSheet";

const data = [
    {
        source: require("./assets/icon.png"),
    },
    {
        source: require("./assets/icon.png"),
    },
    {
        source: require("./assets/icon.png"),
    },
];
export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* <Carousel data={data} /> */}
                <HorizontalSheet data={data} />
                <StatusBar style='light' />
            </View>
        </GestureHandlerRootView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 130,
    },
});
