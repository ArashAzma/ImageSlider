import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import React, { useEffect } from "react";
import Animated, {
    useAnimatedRef,
    useAnimatedScrollHandler,
    useSharedValue,
} from "react-native-reanimated";
import CarouselImage from "./carouselImage";
/*
    0
    411.42857142857144
    822.8571297781808
    1234.2856881277903
    1645.714338030134
    2057.142804827009
*/
const Carousel = ({ data }: { data: { source: any }[] }) => {
    const { width } = Dimensions.get("window");
    const scrollViewRef = useAnimatedRef<ScrollView>();

    const SIZE = width * 0.7;
    const x = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            x.value = event.contentOffset.x;
        },
    });
    useEffect(() => {
        const interval = setInterval(() => {
            x.value += width;
            if (x.value >= (data.length - 1) * SIZE) {
                x.value = 0;
                scrollViewRef.current?.scrollTo({ x: 0, animated: true });
            } else {
                scrollViewRef.current?.scrollTo({ x: x.value, animated: true });
            }
            // console.log(x.value);
        }, 3000);
        return () => {
            clearInterval(interval);
            x.value = 0;
        };
    }, []);
    return (
        <View style={{}}>
            <Animated.ScrollView
                horizontal
                ref={scrollViewRef}
                bounces={false}
                snapToInterval={SIZE}
                onScroll={onScroll}
            >
                {data.map((item, index) => {
                    return (
                        <CarouselImage
                            // x={x}
                            item={item}
                            size={SIZE}
                            index={index}
                            key={index}
                        />
                    );
                })}
            </Animated.ScrollView>
        </View>
    );
};
export default Carousel;
