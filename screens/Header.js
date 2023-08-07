import { StyleSheet, Text, View, Button } from "react-native";
import { styles } from "../styles/mainCss";

export default function Header(props) {
  return (
    <View style={styles.header}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>{props.name ? props.name : "Home"}</Text>
      </View>
    </View>
  );
}
