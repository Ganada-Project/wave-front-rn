import React, { Component } from 'react';
import {
  CameraRoll,
  FlatList,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { Icon } from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
import {
  Wrapper,
  PhotoItem,
  PhotoButton,
  SelectedPhoto,
  PhotoItemWrapper,
  PhotoCheck,
} from './styles';

class UploadScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selectedPhoto: '',
    };
  }

  async componentDidMount() {
    if (Platform.OS !== 'ios' && (await this.requestExternalStoreageRead())) {
      this.getPhotos();
    }
    this.getPhotos();
  }

  handlePhoto = ({ item }) => () => {
    console.log(item);
    RNFetchBlob.fs.readFile(item.node.image.uri, 'base64').then((data) => {
      console.log(data);
    });

    this.setState({ selectedPhoto: item.node.image.uri });
  };

  keyExtractor = (item) => item.node.timestamp.toString();

  renderItem = ({ item, index }) => (
    <PhotoButton onPress={this.handlePhoto({ item })}>
      <PhotoItemWrapper>
        <PhotoCheck>
          <Icon name="check" type="simple-line-icon" />
        </PhotoCheck>
        <PhotoItem
          index={index}
          id={item.id}
          source={{ uri: item.node.image.uri }}
        />
      </PhotoItemWrapper>
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
    const { photos, selectedPhoto } = this.state;
    console.log(selectedPhoto);
    return (
      <Wrapper>
        {selectedPhoto === '' ? null : (
          <SelectedPhoto source={{ uri: selectedPhoto }} />
        )}
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
