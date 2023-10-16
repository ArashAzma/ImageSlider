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
function App() {
    return (
        <View style={styles.container}>
            {/* <Carousel data={data} /> */}
            <HorizontalSheet data={data} />
            <StatusBar style='light' />
        </View>
    );
}
export default () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <App />
        </GestureHandlerRootView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 130,
    },
});
