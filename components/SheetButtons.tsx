import { View, StyleSheet, TouchableHighlight, Dimensions } from "react-native";
import React from "react";
import { HorizontalSheetInterface } from "./HorizontalSheet";
import { SharedValue } from "react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withSpring } from "react-native-reanimated";
interface ButtonSheetInterface extends HorizontalSheetInterface {
    BUTTONWIDTH: number;
    translateX: SharedValue<number>;
}
const { width: ScreenWidth } = Dimensions.get("window");
const SheetButtons = ({
    data,
    BUTTONWIDTH: width,
    translateX,
}: ButtonSheetInterface) => {
    const handlePress = (index: number) => {
        console.log(index);
        translateX.value = withSpring(index * -ScreenWidth, { damping: 100 });
    };
    return (
        <>
            {data?.map((_, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        style={[styles.button, { width }]}
                        onPress={() => handlePress(index)}
                    />
                );
            })}
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 30,
        borderRadius: 15,
        backgroundColor: "white",
    },
});
export default SheetButtons;
