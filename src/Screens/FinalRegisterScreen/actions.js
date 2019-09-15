/*
 * Post Size Card Actions
 *
 */

import { POST_SIZE_CARD_REQUESTING } from './constants';

export function postSizeCardAction({
  weight,
  height,
  gender,
  sizeCardName,
  age,
  imageBase,
  headOffset,
  footOffset,
  leftNeckOffset,
  leftShulderOffset,
  leftElbowOffset,
  leftHandOffset,
  rightNeckOffset,
  rightShulderOffset,
  rightElbowOffset,
  rightHandOffset,
  leftChestOffset,
  leftWaistOffset,
  leftPelvisOffset,
  rightChestOffset,
  rightWaistOffset,
  rightPelvisOffset,
  leftThighOffset,
  leftAnkleOffset,
  rightThighOffset,
  rightAnkleOffset,
  isMe,
}) {
  return {
    type: POST_SIZE_CARD_REQUESTING,
    payload: {
      weight,
      height,
      gender,
      sizeCardName,
      age,
      imageBase,
      headOffset,
      footOffset,
      leftNeckOffset,
      leftShulderOffset,
      leftElbowOffset,
      leftHandOffset,
      rightNeckOffset,
      rightShulderOffset,
      rightElbowOffset,
      rightHandOffset,
      leftChestOffset,
      leftWaistOffset,
      leftPelvisOffset,
      rightChestOffset,
      rightWaistOffset,
      rightPelvisOffset,
      leftThighOffset,
      leftAnkleOffset,
      rightThighOffset,
      rightAnkleOffset,
      isMe,
    },
  };
}
