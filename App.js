// import { StatusBar } from "expo-status-bar";
// import {
//   FlatList,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import { useState } from "react";
// import { evaluate } from "mathjs";

// export default function App() {
//   const [input, setInput] = useState("");

//   const clear = (item) => {
//     if (item === "AC") {
//       setInput("");
//     } else if (item === "+/-") {
//       setInput(input * -1);
//     } else if (item === "%") {
//       setInput(input / 100);
//     } else if (item === "=") {
//       try {
//         setInput(evaluate(input));
//       } catch (e) {
//         setInput("Error");
//       }
//     } else {
//       setInput((prev) => prev + item);
//     }
//   };

//   let info = [
//     "AC",
//     "+/-",
//     "%",
//     "/",
//     "7",
//     "8",
//     "9",
//     "X",
//     "4",
//     "5",
//     "6",
//     "-",
//     "1",
//     "2",
//     "3",
//     "+",
//     "0",
//     ".",
//     "=",
//   ];

//   return (
//     <View style={styles.container}>
//       <TextInput style={styles.screen} value={input || "0"} />
//       <FlatList
//         style={styles.content}
//         data={info}
//         renderItem={({ item }) => (
//           <Pressable
//             onPress={() => {
//               clear(item);
//               // setInput(input);
//             }}
//           >
//             <Text style={styles.text}>{item}</Text>
//           </Pressable>
//         )}
//         numColumns={4}
//       />
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     display: "flex",
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//     paddingTop: 60,
//   },
//   content: {
//     display: "grid",
//     gridTemplateColumns: "repeat(4, 1fr)",
//     width: "100%",
//   },
//   text: {
//     fontSize: 30,
//     textAlign: "center",
//     padding: 20,
//     margin: 5,
//     width: 80,
//     height: 80,
//     backgroundColor: "lightgray",
//     borderRadius: 10,
//   },
//   screen: {
//     height: "250",
//     width: "100%",
//     backgroundColor: "gray",
//     padding: 20,
//     margin: 20,
//   },
// });

import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { evaluate } from "mathjs";

export default function App() {
  const [input, setInput] = useState("");

  function operatorPressed(input, item) {
    if (input) {
      const lastChar = input.slice(-1);
      if (
        lastChar === "+" ||
        lastChar === "-" ||
        lastChar === "/" ||
        lastChar === "*"
      ) {
        const operation = item;
        let problem = input.slice(0, -1);
        setInput(problem + operation);
      }
    }
  }

  const clear = (item) => {
    if (item === "AC") {
      setInput(""); // Clear the input state
    } else if (item === "+/-") {
      setInput((prevInput) =>
        prevInput ? (-parseFloat(prevInput)).toString() : prevInput
      );
    } else if (item === "%") {
      setInput((prevInput) =>
        prevInput ? (parseFloat(prevInput) / 100).toString() : prevInput
      );
    } else if (item === "=") {
      try {
        setInput(parseFloat(evaluate(input)).toFixed(2));
      } catch (error) {
        setInput("Error");
      }
    } else if (item === "X") {
      setInput((prevInput) => prevInput + "*");
      operatorPressed(input, item);
    } else if (item === ".") {
      if (!input.includes(".")) {
        setInput((prevInput) => prevInput + ".");
      } else {
        if (
          input.includes("+") ||
          input.includes("-") ||
          input.includes("*") ||
          input.includes("/")
        ) {
          const lastNumber = input.split(/[\+\-\*\/]/).pop();
          if (!lastNumber.includes(".")) {
            setInput((prevInput) => prevInput + ".");
          }
        }
      }
    } else {
      setInput((prevInput) => prevInput + item);
      if (item === "+" || item === "-" || item === "*" || item === "/") {
        operatorPressed(input, item);
      }
    }
  };

  let info = [
    "AC",
    "+/-",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.screen}
        value={input || ""} // Default to 0 when input is empty
        editable={false} // Make it read-only for user input
      />
      <FlatList
        style={styles.content}
        data={info}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => clear(item)}
            style={({ pressed }) => [
              styles.text,
              { backgroundColor: pressed ? "lightblue" : "lightgray" },
            ]}
          >
            <Text style={styles.buttonText}>{item}</Text>
          </Pressable>
        )}
        numColumns={4}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingTop: 60,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  text: {
    textAlign: "center",
    padding: 20,
    margin: 5,
    width: 80,
    height: 80,
    backgroundColor: "lightgray",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 25,
  },
  screen: {
    height: 250, // Adjusted for better layout
    width: "100%",
    backgroundColor: "gray",
    padding: 20,
    margin: 20,
    fontSize: 30,
    color: "white",
    textAlign: "right",
  },
});
