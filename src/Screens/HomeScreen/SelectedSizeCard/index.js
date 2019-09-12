import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import {
  Wrapper,
  ProfileWrapper,
  InfoWrapper,
  SizeCardName,
  ShadowBox,
} from './styles';
import { theme } from '../../../constants';

const SelectedSizeCard = ({ name, empty, onPress }) => {
  function renderIconImage() {
    if (empty) {
      return 'plus';
    }
    return 'man';
  }
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <ShadowBox>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={
            empty
              ? [theme.grayColor, theme.grayColor]
              : [theme.pointColor, theme.subColor]
          }
          style={{
            borderRadius: 10,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 1,
            // opacity: 0.9,
          }}
        >
          <Wrapper>
            <InfoWrapper>
              <ProfileWrapper
                color={empty ? theme.grayColor : theme.pointColor}
              >
                <Icon
                  name={renderIconImage()}
                  type="antdesign"
                  size={15}
                  color="white"
                />
              </ProfileWrapper>
              <SizeCardName>{name}</SizeCardName>
            </InfoWrapper>
            <Icon
              name="arrow-right"
              type="simple-line-icon"
              size={15}
              color={theme.grayColor}
            />
          </Wrapper>
        </LinearGradient>
      </ShadowBox>
    </TouchableWithoutFeedback>
  );
};

SelectedSizeCard.propTypes = {
  name: PropTypes.string,
  empty: PropTypes.bool,
  onPress: PropTypes.func,
};

export default SelectedSizeCard;
