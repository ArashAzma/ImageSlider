import { View, StyleSheet } from "react-native";
import React from "react";
import { HorizontalSheetInterface } from "./HorizontalSheet";
interface ButtonSheetInterface extends HorizontalSheetInterface {
    BUTTONWIDTH: number;
}
const SheetButtons = ({ data, BUTTONWIDTH: width }: ButtonSheetInterface) => {
    return (
        <>
            {data?.map((_, index) => {
                return <View key={index} style={[styles.button, { width }]} />;
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
