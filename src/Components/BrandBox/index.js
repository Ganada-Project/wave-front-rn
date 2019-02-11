import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Wrapper, ImageArea, TextArea, BrandImage, BrandTitle,
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
          <BrandImage
            source={{
              uri: brand.get('brand_profile_img'),
            }}
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
