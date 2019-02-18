//import liraries
import React, { Component } from 'react';
import VideoPlayer from 'react-native-video-controls';

// create a component
class VideoPlayerScreen extends Component {
  render() {
    const { image } = this.props.navigation.state.params;
    return (
      <VideoPlayer
        source={image}
        navigator={this.props.navigation}
      />
    );
  }
}

//make this component available to the app
export default VideoPlayerScreen;
