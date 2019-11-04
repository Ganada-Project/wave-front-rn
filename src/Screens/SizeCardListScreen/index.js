import React, { Component } from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import { Wrapper, HeadderText, Header, SubText, Body } from './styles';
import { AuthTopBarOption } from '../../constants';
import SizeCard from './SizeCard';

class SizeCardListScreen extends Component {
  static options() {
    return {
      topBar: {
        ...AuthTopBarOption,
        leftButtons: [
          {
            id: 'cancel',
            text: '취소',
          },
        ],
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
    Navigation.events().bindComponent(this);
  }

  closeModal = () => {
    const { componentId } = this.props;
    Navigation.dismissModal(componentId);
  };

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'cancel') {
      this.closeModal();
    }
  }

  navigateToSizeCardDetail = ({ sizeCard }) => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'wave.sizeCardDetail',
        passProps: {
          sizeCard,
        },
      },
    });
  };

  render() {
    const {
      sizeCards,
      user,
      selectedSizeCard,
      setSizeCard,
      componentId,
    } = this.props;
    return (
      <Wrapper>
        <Header>
          <View>
            <HeadderText>사이즈 카드</HeadderText>
            <SubText>{`총 ${sizeCards.size}개의 사이즈카드`}</SubText>
          </View>
        </Header>
        <Body showsVerticalScrollIndicator={false}>
          {sizeCards.map(sizeCard => (
            <SizeCard
              key={sizeCard.id}
              sizeCard={sizeCard}
              isMe={user.get('id') === sizeCard.user_id}
              isSelected={selectedSizeCard.get('id') === sizeCard.id}
              selectedSizeCard={selectedSizeCard}
              onPressCard={() =>
                this.navigateToSizeCardDetail({
                  sizeCard,
                })
              }
              onPressSelectCard={() => setSizeCard({ sizeCard, componentId })}
            />
          ))}
        </Body>
      </Wrapper>
    );
  }
}

SizeCardListScreen.propTypes = {
  componentId: PropTypes.string,
  user: PropTypes.instanceOf(Object),
  selectedSizeCard: PropTypes.object,
  sizeCards: PropTypes.instanceOf(List),
  setSizeCard: PropTypes.func,
};

export default SizeCardListScreen;
