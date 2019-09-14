import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
// moment
import moment from 'moment';
import 'moment/src/locale/ko';

import { fromJS } from 'immutable';
import {
  Wrapper,
  ProfileWrapper,
  ContentWrapper,
  SizeCardName,
  ButtonWrapper,
  ProfileImageBg,
  ButtonInner,
  ButtonText,
  DescWrapper,
  DescText,
  TopWrapper,
  CreatedAt,
  MyCardWrapper,
  MyCardText,
} from './styles';
import {
  renderIconImage,
  renderProfileBgColor,
} from '../../../utils/functions/renderSizeCard';
import { theme } from '../../../constants';

const SizeCard = ({
  sizeCard, isMe, onPressSelectCard, isSelected,
}) => (
  <Wrapper>
    <ProfileWrapper>
      <ProfileImageBg
        color={renderProfileBgColor({ sizeCard: fromJS(sizeCard) })}
      >
        <Icon
          name={renderIconImage({ sizeCard: fromJS(sizeCard) })}
          type="antdesign"
          size={16}
          color="white"
        />
      </ProfileImageBg>
      {isMe ? (
        <MyCardWrapper>
          <MyCardText>본인</MyCardText>
        </MyCardWrapper>
      ) : null}
    </ProfileWrapper>
    <ContentWrapper>
      <TopWrapper>
        <SizeCardName>{sizeCard.name}</SizeCardName>
        <DescWrapper>
          <DescText>{sizeCard.age}</DescText>
          <Icon
            name="dot-single"
            type="entypo"
            color={theme.darkGray}
            size={10}
          />
          <DescText>{sizeCard.gender === 1 ? 'M' : 'W '}</DescText>
          <Icon
            name="dot-single"
            type="entypo"
            color={theme.darkGray}
            size={10}
          />
          <DescText>{sizeCard.body_shape}</DescText>
        </DescWrapper>
      </TopWrapper>
      <CreatedAt>1달 전에 생성됨</CreatedAt>
    </ContentWrapper>
    <ButtonWrapper>
      <TouchableOpacity
        style={{ width: '100%' }}
        onPress={isSelected ? null : onPressSelectCard}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={
            isSelected
              ? [theme.grayColor, theme.grayColor]
              : [theme.pointColor, theme.subColor]
          }
          style={{
            borderRadius: 10,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            width: '85%',
            padding: 1,
            // opacity: 0.9,
          }}
        >
          <ButtonInner>
            <ButtonText isSelected>
              {isSelected ? '선택된 카드' : '선택하기'}
            </ButtonText>
          </ButtonInner>
        </LinearGradient>
      </TouchableOpacity>
    </ButtonWrapper>
  </Wrapper>
);

SizeCard.propTypes = {
  sizeCard: PropTypes.object,
  isMe: PropTypes.bool,
  isSelected: PropTypes.bool,
  onPressSelectCard: PropTypes.func,
};

export default SizeCard;
