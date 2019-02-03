import { StyleSheet } from "react-native";
import { theme } from "../../constants";

const styles = StyleSheet.create({
  disabledContainer: {
    backgroundColor: "#ffffff",
    width: "100%",
    borderRadius: 30,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    opacity: 0.5
  },
  disabledInvertContainer: {
    backgroundColor: theme.pointColor,
    width: "100%",
    borderRadius: 30,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    opacity: 0.5
  },
  defaultContainer: {
    backgroundColor: "#ffffff",
    width: "100%",
    borderRadius: 30,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 55
  },
  defaultButton: {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center"
  },
  defaultText: {
    color: theme.pointColor,
    fontSize: 16,
    fontWeight: "700"
  },
  defaultIcon: {
    color: theme.pointColor,
    marginRight: 10
  },
  invertIcon: {
    color: "#ffffff",
    marginRight: 10
  },
  invertContainer: {
    backgroundColor: theme.pointColor,
    borderWidth: 1,
    borderColor: "white",
    width: "100%",
    borderRadius: 30,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 55
  },
  invertButton: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.pointColor,
    justifyContent: "center"
  },
  invertText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700"
  }
});

export default styles;
