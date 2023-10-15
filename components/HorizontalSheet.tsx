import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    ImageSourcePropType,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
const { width } = Dimensions.get("window");
interface HorizontalSheetInterface {
    data: { source: ImageSourcePropType }[];
}
const HorizontalSheet = ({ data }: HorizontalSheetInterface) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const translateX = useSharedValue(0);
    const context = useSharedValue({ x: 0 });
    const ImageScrollWidth = data.length * width;
    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { x: translateX.value };
        })
        .onUpdate((event) => {
            translateX.value = event.translationX + context.value.x;
            const index = Math.floor(Math.abs(translateX.value) / width);
            // console.log(index);
            // if (index !== activeImageIndex) {
            //     setActiveImageIndex(index);
            // }
        })
        .onEnd(() => {
            const maxIndex = data.length - 1;
            const divide = (translateX.value / width) * -1;
            let activeImageIndex = Math.floor(divide);
            const s = divide - Math.floor(divide);
            if (s >= 0.65) {
                activeImageIndex = Math.min(maxIndex, activeImageIndex + 1);
            } else if (s <= 0.35) {
                activeImageIndex = Math.max(0, activeImageIndex - 1);
            } else {
                activeImageIndex = Math.max(0, activeImageIndex);
            }
            const targetX = -activeImageIndex * width;
            // setActiveImageIndex(activeImageIndex);
            translateX.value = withSpring(targetX, { damping: 100 });
        });

    const ViewStyle = useAnimatedStyle(() => {
        return { transform: [{ translateX: translateX.value }] };
    });
    useEffect(() => {
        console.log(ImageScrollWidth);
        const interval = setInterval(() => {
            if (
                Math.abs(translateX.value) <= ImageScrollWidth &&
                Math.abs(translateX.value) >= ImageScrollWidth - width
            ) {
                translateX.value = withSpring(0, { damping: 100 });
            } else {
                translateX.value = withSpring(translateX.value - width, {
                    damping: 100,
                });
            }
        }, 4000);
        return () => clearInterval(interval);
    }, []);
    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={{ flex: 1, width: "100%" }}>
                <Animated.View
                    style={[
                        styles.style1,
                        ViewStyle,
                        { height: width, width: ImageScrollWidth },
                    ]}
                >
                    {data?.map((item, index) => {
                        return (
                            <Image
                                source={item.source}
                                style={styles.image}
                                key={index}
                            />
                        );
                    })}
                </Animated.View>
                <View
                    style={{
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/* {data?.map((item, index) => {
                        return (
                            <View
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor:
                                            index === activeImageIndex
                                                ? "red"
                                                : "white",
                                    },
                                ]}
                            />
                        );
                    })} */}
                </View>
            </Animated.View>
        </GestureDetector>
    );
};
const styles = StyleSheet.create({
    style1: {
        flexDirection: "row",
        borderRadius: 40,
        position: "absolute",
        left: 0,
        top: 100,
    },
    image: {
        width,
        height: width,
        borderRadius: 25,
    },
    text: {
        color: "white",
        fontSize: 30,
    },
    button: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
});

export default HorizontalSheet;
