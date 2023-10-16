import {
    View,
    Dimensions,
    StyleSheet,
    ImageSourcePropType,
} from "react-native";
import React, { useEffect } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import SheetImages from "./SheetImages";
import SheetButtons from "./SheetButtons";
const { width } = Dimensions.get("window");
export interface HorizontalSheetInterface {
    data: { source: ImageSourcePropType }[];
}
const BUTTONWIDTH = 30;
const NEXTIMAGESLIDEPERCENTAGE = 0.65;
const PREVIOUSIMAGESLIDEPERCENTAGE = 0.35;
const HorizontalSheet = ({ data }: HorizontalSheetInterface) => {
    const translateX = useSharedValue(0);
    const context = useSharedValue({ x: 0 });
    const ImageScrollWidth = data.length * width;
    const gesture = Gesture.Pan()
        .onStart(() => {
            context.value = { x: translateX.value };
        })
        .onUpdate((event) => {
            translateX.value = event.translationX + context.value.x;
        })
        .onEnd(() => {
            const maxIndex = data.length - 1;
            const divide = (translateX.value / width) * -1;
            let activeImageIndex = Math.floor(divide);
            const s = divide - Math.floor(divide);
            if (s >= NEXTIMAGESLIDEPERCENTAGE) {
                activeImageIndex = Math.min(maxIndex, activeImageIndex + 1);
            } else if (s <= PREVIOUSIMAGESLIDEPERCENTAGE) {
                activeImageIndex = Math.max(0, activeImageIndex - 1);
            } else {
                activeImageIndex = Math.max(0, activeImageIndex);
            }
            const targetX = -activeImageIndex * width;
            translateX.value = withSpring(targetX, { damping: 100 });
        });

    const ViewStyle = useAnimatedStyle(() => {
        return { transform: [{ translateX: translateX.value }] };
    });
    const ButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: (translateX.value / width) * -BUTTONWIDTH },
            ],
        };
    });
    useEffect(() => {
        const interval = setInterval(() => {
            if (
                Math.abs(translateX.value) <= ImageScrollWidth &&
                Math.abs(translateX.value) >= ImageScrollWidth - width
            ) {
                translateX.value = withSpring(0, { damping: 100 });
            } else {
                translateX.value = withSpring(
                    Math.max(translateX.value - width, ImageScrollWidth * -1),
                    {
                        damping: 100,
                    }
                );
            }
        }, 4000);
        return () => clearInterval(interval);
    }, []);
    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={{ flex: 1, width: "100%" }}>
                <Animated.View
                    style={[
                        styles.imageSlider,
                        ViewStyle,
                        { height: width, width: ImageScrollWidth },
                    ]}
                >
                    <SheetImages data={data} />
                </Animated.View>
                <View style={styles.buttonContainer}>
                    <View
                        style={[
                            styles.buttonsSlider,
                            { width: data.length * BUTTONWIDTH },
                        ]}
                    >
                        <SheetButtons
                            data={data}
                            BUTTONWIDTH={BUTTONWIDTH}
                            translateX={translateX}
                        />
                        <Animated.View
                            style={[
                                styles.button,
                                ButtonStyle,
                                {
                                    backgroundColor: "skyblue",
                                    position: "absolute",
                                    left: 0,
                                },
                            ]}
                        />
                    </View>
                </View>
            </Animated.View>
        </GestureDetector>
    );
};
const styles = StyleSheet.create({
    imageSlider: {
        flexDirection: "row",
        borderRadius: 40,
        position: "absolute",
        left: 0,
        top: 100,
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonsSlider: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: BUTTONWIDTH,
        height: 30,
        borderRadius: 15,
        backgroundColor: "white",
    },
});

export default HorizontalSheet;
