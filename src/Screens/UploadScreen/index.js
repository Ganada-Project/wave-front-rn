import React, { Component } from 'react';
import {
  CameraRoll,
  FlatList,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { Wrapper, PhotoItem, PhotoButton } from './styles';

class UploadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
    };
  }

  async componentDidMount() {
    if (Platform.OS !== 'ios' && (await this.requestExternalStoreageRead())) {
      this.getPhotos();
    }
    this.getPhotos();
  }

  keyExtractor = (item) => item.node.timestamp.toString();

  renderItem = ({ item, index }) => (
    <PhotoButton>
      <PhotoItem
        index={index}
        id={item.id}
        source={{ uri: item.node.image.uri }}
      />
    </PhotoButton>
  );

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 1000,
      assetType: 'All',
    })
      .then((r) => {
        this.setState({ photos: r.edges });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async requestExternalStoreageRead() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool App ...',
          message: 'App needs access to external storage',
        },
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      // Handle this error
      return false;
    }
  }

  render() {
    const { photos } = this.state;
    return (
      <Wrapper>
        <FlatList
          data={photos}
          numColumns={3}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </Wrapper>
    );
  }
}

export default UploadScreen;
