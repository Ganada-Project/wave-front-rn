/*
 * Author: ShinHyunJong
 * Application Name : Wave
 * Corpyright : Ganada Project
 */
import React, { Component } from 'react';
// prop-types
import PropTypes from 'prop-types';

import { is } from 'immutable';
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
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

// global components
import {} from '../../Components';
// global selectors
import { makeSelectUser } from '../App/selectors';

// local selectors
import { makeSelectSizeDetail } from './selectors';

// local actions
import { getSizeDetailRequestAction } from './actions';

// local sagas
import saga from './saga';
// local reducer
import reducer from './reducer';

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

class SizeCardDetailScreen extends Component {
  static options() {
    return {
      topBar: {
        ...AuthTopBarOption,
      },
      statusBar: {
        style: 'light',
      },
    };
  }

  constructor(props) {
    super(props);
    const { sizeDetail } = props;
    this.state = {
      selectedTap: sizeDetail.get(0),
    };
  }

  componentDidMount() {
    const { sizeCardId, getSizeCardDetail } = this.props;
    getSizeCardDetail({ sizeCardId });
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.sizeDetail.get(0).toJS());
    console.log(nextProps.sizeDetail.get(0).toJS());
    if (
      !this.props.sizeDetail.getIn([0, 'measurement'])
      && nextProps.sizeDetail.getIn([0, 'measurement'])
    ) {
      this.setState({ selectedTap: nextProps.sizeDetail.get(0) });
    }
  }

  handleMainTap = (tap) => {
    this.setState({ selectedTap: tap });
  };

  render() {
    const { sizeCardName, sizeDetail } = this.props;
    const { selectedTap } = this.state;
    return (
      <Wrapper>
        <Header>
          <HeaderText>{sizeCardName}</HeaderText>
        </Header>
        <Body>
          <BodyContent>
            <SubTapWrapper>
              {sizeDetail.map((sTap) => (
                <TouchableOpacity
                  key={sTap.get('id')}
                  onPress={() => this.handleMainTap(sTap)}
                  style={{
                    width: '100%',
                    height: '10%',
                  }}
                >
                  <SubTapItem>
                    <SubTapTextWrapper>
                      <SubTapText
                        isSelected={selectedTap.get('id') === sTap.get('id')}
                      >
                        {sTap.get('name')}
                      </SubTapText>
                    </SubTapTextWrapper>
                  </SubTapItem>
                </TouchableOpacity>
              ))}
            </SubTapWrapper>
            <DetailWrapper>
              <ImageWrapper>
                <FastImage
                  source={{
                    uri: selectedTap.get('url'),
                  }}
                  style={{ width: 200, height: 200, borderRadius: 20 }}
                />
              </ImageWrapper>
              <MeasurementWrapper>
                <MeasurementText>
                  {selectedTap.get('measurement')}
                </MeasurementText>
              </MeasurementWrapper>
            </DetailWrapper>
          </BodyContent>
        </Body>
      </Wrapper>
    );
  }
}

SizeCardDetailScreen.propTypes = {
  componentId: PropTypes.string,
  user: PropTypes.instanceOf(Object),
  sizeCardName: PropTypes.string,
  sizeCardId: PropTypes.number,
  sizeDetail: PropTypes.instanceOf(Object),
  getSizeCardDetail: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  sizeDetail: makeSelectSizeDetail(),
  user: makeSelectUser(),
});

const mapDispatchToProps = (dispatch) => ({
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
