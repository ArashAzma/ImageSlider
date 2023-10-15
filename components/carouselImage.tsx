import { View, Text, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { SharedValue } from "react-native-reanimated";
interface ImageInterface {
    item: { source: ImageSourcePropType };
    // x: SharedValue<number>;
    size: number;
    index: number;
    key: number;
}

const CarouselImage = ({ item, size, index }: ImageInterface) => {
    return (
        <View
            style={{
                width: (size * 10) / 7,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Image
                source={item.source}
                style={{
                    width: size,
                    height: size,
                    borderRadius: 45,
                }}
            />
            <Text style={{ color: "white", fontSize: 36 }}>{index}</Text>
        </View>
    );
};
export default CarouselImage;
1;
