import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {
  Wrapper, ImageArea, TextArea, BrandTitle,
} from './style';

class BrandBox extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { brand, onPress } = this.props;
    return (
      <Wrapper onPress={onPress}>
        <ImageArea>
          <FastImage
            source={{
              uri: brand.get('brand_profile_img'),
            }}
            style={{ width: '100%', height: '100%' }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </ImageArea>
        <TextArea selected={brand.get('selected')}>
          <BrandTitle selected={brand.get('selected')}>
            {brand.get('brand_name')}
          </BrandTitle>
        </TextArea>
      </Wrapper>
    );
  }
}

BrandBox.propTypes = {
  brand: PropTypes.object,
  onPress: PropTypes.func,
};

export default BrandBox;
