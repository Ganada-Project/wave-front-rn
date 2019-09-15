import React, { Component } from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import {
  Wrapper, HeadderText, Header, SubText, Body,
} from './styles';
import { AuthTopBarOption } from '../../constants';
import SizeCard from './SizeCard';

class SizeCardListScreen extends Component {
  static options() {
    return {
      topBar: {
        ...AuthTopBarOption,
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  closeModal = () => {
    const { componentId } = this.props;
    Navigation.dismissModal(componentId);
  };

  navigateToSizeCardDetail = ({ sizeCardId, sizeCardName }) => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'wave.sizeCardDetail',
        passProps: {
          sizeCardId,
          sizeCardName,
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
          <TouchableWithoutFeedback onPress={this.closeModal}>
            <View
              style={{
                width: 40,
                height: 40,
                alignItems: 'flex-start',
              }}
            >
              <Icon name="close" type="evilicons" size={30} />
            </View>
          </TouchableWithoutFeedback>
        </Header>
        <View>
          <HeadderText>사이즈 카드</HeadderText>
          <SubText>{`총 ${sizeCards.size}개 의 사이즈카드`}</SubText>
        </View>
        <Body showsVerticalScrollIndicator={false}>
          {sizeCards.map((sizeCard) => (
            <SizeCard
              key={sizeCard.id}
              sizeCard={sizeCard}
              isMe={user.get('id') === sizeCard.user_id}
              isSelected={selectedSizeCard.get('id') === sizeCard.id}
              selectedSizeCard={selectedSizeCard}
              onPressCard={() => this.navigateToSizeCardDetail({
                sizeCardId: sizeCard.id,
                sizeCardName: sizeCard.name,
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
