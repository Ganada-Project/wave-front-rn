import React, { Component } from 'react';
import { Text } from 'react-native';
import {
  Wrapper, ImageArea, TextArea, BrandImage, BrandTitle,
} from './style';

class BrandBox extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Wrapper>
        <ImageArea>
          <BrandImage
            source={{
              uri: 'https://i.ytimg.com/vi/DEIUzqLFNPM/maxresdefault.jpg',
            }}
          />
        </ImageArea>
        <TextArea>
          <BrandTitle> textInComponent </BrandTitle>
        </TextArea>
      </Wrapper>
    );
  }
}

export default BrandBox;
