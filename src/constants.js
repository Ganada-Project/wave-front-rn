/**
 * Global Constants
 */
import { Platform } from "react-native";
export const API_URL = "http://13.124.21.111/";

export const theme = {
  pointColor: "#dd6871",
  whiteColor: "#ffffff",
  grayColor: "#d8d8d8",
  textColor: "#5b5e6d"
};
export const keyboardVerticalOffset = Platform.OS === "ios" ? 65 : 0;
export const keyboardBehavior = Platform.OS === "ios" ? "padding" : null;
