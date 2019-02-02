import { FETCH_USER_REQUESTING, TRY_SIGN_OUT_SUCCESS } from "./constants";

export function fetchUserAction({ idToken, componentId }) {
  return {
    type: FETCH_USER_REQUESTING,
    idToken,
    componentId
  };
}
