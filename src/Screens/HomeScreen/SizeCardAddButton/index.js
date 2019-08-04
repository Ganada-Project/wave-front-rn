import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Text } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import { ContainerButton } from '../../../Components';
import { Wrapper, TitleText, DescText } from './styles';
import styles from '../styles';

function SizeCardAddButton({ onPressMe }) {
  const { onPressAdd } = props;
  return (
    <ContainerButton onPress={onPressAdd}>
      <Wrapper>
        <TitleText>새 사이즈카드 추가</TitleText>
        <DescText>신체치수를 측정해볼까요?</DescText>
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          position="center"
          hideShadow
        >
          <ActionButton.Item buttonColor="#9b59b6" onPress={onPressMe}>
            <Text>나</Text>
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#3498db" onPress={() => {}}>
            <Text>친구</Text>
          </ActionButton.Item>
        </ActionButton>
        {/* <Icon name="plus" type="simple-line-icon" color="#ffffff" size={70} /> */}
      </Wrapper>
    </ContainerButton>
  );
}

SizeCardAddButton.propTypes = {
  onPressAdd: PropTypes.func,
  onPressMe: PropTypes.func,
};

export default SizeCardAddButton;
