import { Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { HorizontalSheetInterface } from "./HorizontalSheet";
const { width } = Dimensions.get("window");
const SheetImages = ({ data }: HorizontalSheetInterface) => {
    return (
        <>
            {data?.map((item, index) => {
                return (
                    <Image
                        source={item.source}
                        style={styles.image}
                        key={index}
                    />
                );
            })}
        </>
    );
};

const styles = StyleSheet.create({
    image: {
        width,
        height: width,
        borderRadius: 25,
    },
});
export default SheetImages;
