/*
 * Author: ShinHyunJong
 * Application Name : Wave
 * Corpyright : Ganada Project
 */
import React, { Component } from 'react';
// prop-types
import PropTypes from 'prop-types';

import { is, fromJS } from 'immutable';
// react-native
import { View, Text, TouchableOpacity } from 'react-native';
// react-native-navigation
import { Navigation } from 'react-native-navigation';

// redux
import { compose } from 'redux';
import { connect } from 'react-redux';
// reselect -> reducer에 있는 프로퍼티들 선택 툴
import { createStructuredSelector } from 'reselect';
import FastImage from 'react-native-fast-image';
import { Icon } from 'react-native-elements';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

// global components
import {} from '../../Components';
// global selectors
import { makeSelectUser } from '../App/selectors';

// local selectors
import { makeSelectSizeDetail, makeSelectSizeDetailLoading } from './selectors';

// local actions
import { getSizeDetailRequestAction } from './actions';

// local sagas
import saga from './saga';
// local reducer
import reducer from './reducer';

import { sizeDetailTab } from './constants';

import { theme, AuthTopBarOption } from '../../constants';
// local styles
import {
  Wrapper,
  Header,
  HeaderText,
  Body,
  TapWrapper,
  TapItem,
  TapText,
  TapIndicator,
  SubTapWrapper,
  SubTapItem,
  SubTapText,
  BodyContent,
  DetailWrapper,
  MeasurementWrapper,
  MeasurementText,
  ImageWrapper,
  SubTapIndicator,
  SubTapTextWrapper,
  SubTapIndicatorWrapper,
  TapIndicatorBlank,
  SubTapIndicatorBlank,
} from './styles';
import { renderIconImage } from '../../utils/functions/renderSizeCard';

class SizeCardDetailScreen extends Component {
  static options() {
    return {
      topBar: {
        ...AuthTopBarOption,
      },
      statusBar: {
        style: 'dark',
      },
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedTap: 0,
    };
  }

  componentDidMount() {
    const { sizeCard, getSizeCardDetail } = this.props;
    getSizeCardDetail({ sizeCardId: sizeCard.id });
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props.sizeDetail.get(0).toJS());
  //   console.log(nextProps.sizeDetail.get(0).toJS());
  //   if (
  //     !this.props.sizeDetail.getIn([0, 'measurement'])
  //     && nextProps.sizeDetail.getIn([0, 'measurement'])
  //   ) {
  //     this.setState({ selectedTap: nextProps.sizeDetail.get(0) });
  //   }
  // }

  handleSizeDetailTab = id => {
    this.setState({ selectedTap: id });
  };

  renderBySelectedTap = () => {
    const { sizeDetail, sizeDetailLoading } = this.props;
    const { selectedTap } = this.state;
    if (selectedTap === 0) {
      return <View></View>;
    }
    return sizeDetail.map(sTap => (
      <SubTapItem key={`sizeDetail-list-${sTap.get('id')}`}>
        <TouchableOpacity
          onPress={() => this.handleMainTap(sTap)}
          style={{
            width: '100%',
          }}
        >
          <SubTapTextWrapper>
            <View>
              <SubTapText>{sTap.get('name')}</SubTapText>
              <SubTapItem.SizeText>
                {sizeDetailLoading ? '로딩중' : sTap.get('measurement')}
              </SubTapItem.SizeText>
            </View>
            <Icon
              name="arrow-right"
              type="simple-line-icon"
              size={16}
              color={theme.grayColor}
            ></Icon>
          </SubTapTextWrapper>
        </TouchableOpacity>
      </SubTapItem>
    ));
  };

  render() {
    const { sizeCard } = this.props;
    const { selectedTap } = this.state;
    return (
      <Wrapper contentContainerStyle={{ justifyContent: 'center' }}>
        <Header>
          <Header.Profile>
            <Header.Image color={sizeCard.card_color}>
              <Icon
                name={renderIconImage({ sizeCard: fromJS(sizeCard) })}
                type="antdesign"
                size={30}
                color="white"
              />
            </Header.Image>
            <Header.Text>{sizeCard.name}</Header.Text>
          </Header.Profile>
          <Header.Tab>
            {sizeDetailTab.map(sDtab => (
              <Header.TabItemWrapper key={`sizeDetail-tab-${sDtab.id}`}>
                <TouchableOpacity
                  onPress={() => this.handleSizeDetailTab(sDtab.id)}
                >
                  <Header.TabItem isSelected={sDtab.id === selectedTap}>
                    <Header.TabItemText isSelected={sDtab.id === selectedTap}>
                      {sDtab.name}
                    </Header.TabItemText>
                  </Header.TabItem>
                </TouchableOpacity>
              </Header.TabItemWrapper>
            ))}
          </Header.Tab>
        </Header>
        <Body showsVerticalScrollIndicator={false}>
          <BodyContent>{this.renderBySelectedTap()}</BodyContent>
        </Body>
      </Wrapper>
    );
  }
}

SizeCardDetailScreen.propTypes = {
  componentId: PropTypes.string,
  user: PropTypes.instanceOf(Object),
  sizeCard: PropTypes.object,
  sizeDetail: PropTypes.instanceOf(Object),
  sizeDetailLoading: PropTypes.bool,
  getSizeCardDetail: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  sizeDetail: makeSelectSizeDetail(),
  sizeDetailLoading: makeSelectSizeDetailLoading(),
  user: makeSelectUser(),
});

const mapDispatchToProps = dispatch => ({
  getSizeCardDetail: ({ componentId, sizeCardId }) => {
    dispatch(getSizeDetailRequestAction({ componentId, sizeCardId }));
  },
});

const withSaga = injectSaga({ key: 'sizeDetail', saga });
const withReducer = injectReducer({ key: 'sizeDetail', reducer });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  withConnect,
  withSaga,
  withReducer,
)(SizeCardDetailScreen);
