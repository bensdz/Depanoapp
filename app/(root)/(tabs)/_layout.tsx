import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Layout: React.FC = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Header</Text>
      <View style={styles.content}>{children}</View>
      <Text style={styles.footer}>Footer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    height: 50,
    backgroundColor: "#f8f8f8",
    textAlign: "center",
    padding: 15,
    fontSize: 18,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  footer: {
    height: 50,
    backgroundColor: "#f8f8f8",
    textAlign: "center",
    padding: 15,
    fontSize: 18,
  },
});

export default Layout;
