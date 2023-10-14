import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Carousel from "./components/Carousel";

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
        <View style={styles.container}>
            <Carousel data={data} />
            <StatusBar style='light' />
        </View>
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
