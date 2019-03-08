import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { Navigation } from 'react-native-navigation';
import { Wrapper } from './styles';

class UploadInfoScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  navgateToUpload = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'wave.upload',
              options: {
                topBar: {
                  title: {
                    text: 'Modal',
                  },
                },
              },
            },
          },
        ],
      },
    });
  };

  render() {
    return (
      <Wrapper>
        <Button title="사진 업로드 하기" onPress={this.navgateToUpload} />
      </Wrapper>
    );
  }
}

export default UploadInfoScreen;
