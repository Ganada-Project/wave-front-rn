import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import { ContainerButton } from '../../../Components';
import { Wrapper, TitleText, DescText } from './styles';

function SizeCardAddButton(props) {
  const { onPressAdd } = props;  
  return (
    <ContainerButton onPress={onPressAdd}>
      <Wrapper>
        <TitleText>새 사이즈카드 추가</TitleText>
        <DescText>신체치수를 측정해볼까요?</DescText>
        <Icon name="plus" type="simple-line-icon" color="#ffffff" size={70} />
      </Wrapper>
    </ContainerButton>
  );
}

SizeCardAddButton.propTypes = {
  onPressAdd: PropTypes.func,
};

export default SizeCardAddButton;
