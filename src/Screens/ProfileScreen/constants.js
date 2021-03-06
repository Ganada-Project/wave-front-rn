/*
 * ProfileConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 * Copyright : Ganada Project
 */
import { Dimensions } from 'react-native';
import { BaseHeightOffset } from '../../constants';

const window = Dimensions.get('window');

export const IMAGE_WIDTH = 60;
export const IMAGE_HEIGHT = 60;
export const IMAGE_RADIUS = 30;
