import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";

const Pgination = ({ onPaginationChange }) => {
  const [count, setCount] = useState(0);
  const [Color, setColor] = useState("white");
  useEffect(() => {
    onPaginationChange(count);
  }, [count]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (count === 0) {
        setCount(0);
      } else {
        setCount(count - 1);
      }
    } else if (type === "next") {
      if (count === 50) {
        setCount(50);
      } else {
        setCount(count + 1);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Button
        style={styles.text}
        title="< Prev"
        onPress={() => onButtonClick("prev")}
      ></Button>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {new Array(50).fill("").map((el, key) => (
          <TouchableOpacity
            key={key}
            style={[styles.number, { backgroundColor: Color }]}
            onPress={() => setCount(key)}
          >
            <Text style={styles.text}>{key + 1}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Button
        style={styles.text}
        title="Next >"
        onPress={() => onButtonClick("next")}
      ></Button>
    </View>
  );
};

export default Pgination;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    bottom: -7,
  },
  number: {
    flexDirection: "row",
    marginHorizontal: 5,
    height: 35,
    width: 35,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    color: "black",
  },
});
