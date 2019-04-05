import {
  MAGINIFIER_CONTAINER_SIZE,
  HALF_SLIDER_SIZE,
  IMAGE_WIDTH,
  IMAGE_HEIGHT,
} from '../constants';

// 슬라이더에 기반한 돋보기 좌표 조정 로직
export const outputX = ({ xOffset, isStart, zoom }) => {
  if (isStart) {
    return -(xOffset - MAGINIFIER_CONTAINER_SIZE) - HALF_SLIDER_SIZE;
  }
  return -(
    IMAGE_WIDTH
    + (xOffset - MAGINIFIER_CONTAINER_SIZE)
    + HALF_SLIDER_SIZE
  );
};

export const outputY = ({ yOffset, isStart, zoom }) => {
  if (isStart) {
    return -(yOffset - MAGINIFIER_CONTAINER_SIZE) - HALF_SLIDER_SIZE;
  }
  return -(
    IMAGE_HEIGHT
    + (yOffset - MAGINIFIER_CONTAINER_SIZE)
    + HALF_SLIDER_SIZE
  );
};

export const distanceBetween2Offset = ({ offset1, offset2 }) => {
  const xDistancePw = Math.pow(offset1.x - offset2.x, 2);
  const yDistancePw = Math.pow(offset1.y - offset2.y, 2);
  const sum = xDistancePw + yDistancePw;
  const result = Math.sqrt(sum);
  return result;
};
