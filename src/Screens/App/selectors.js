/*
 * Author: ShinHyunJong
 * Application Name : Wave
 * Corpyright : Ganada Project
 */

import { createSelector } from "reselect";

const selectGlobal = state => state.get("global");

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.getIn(["userData", "user"])
  );

export { selectGlobal, makeSelectUser };
