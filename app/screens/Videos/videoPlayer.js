//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, Image, Text } from 'react-native';
import { width } from 'react-native-dimension';
import Video from 'react-native-video';
import images from '../../const/images';

// Constants
const PLAYING = 0;
const PAUSED = 1;
const ENDED = 2;

const SEEKING = 0;
const NOT_SEEKING = 1;


// create a component
class VideoPlayerPage extends Component {
  constructor() {
    super();
    this.state = {
      status: PLAYING,
      duration: 0,
      currentTime: 0,
      seekStatus: NOT_SEEKING,
      seekPosition: 0, // in percentage
      sliderStartX: 0,
      sliderWidth: 0,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.slider.measure((fx, fy, width, height, px, py) => {
        console.log('start x = ' + px);
        this.setState({ sliderStartX: px, sliderWidth: width });
      })
    }, 500);
  }

  onLoad(payload) {
    let { duration } = payload;
    duration = Math.floor(duration);
    this.setState({duration});
  }

  onProgress(payload) {
    const { currentTime } = payload;
    this.setState({currentTime});
  }

  onEnd() {
    this.setState({status: ENDED})
  }

  onPlayButtonPress() {
    const { status } = this.state;
    if (status === PAUSED || status === PLAYING) {
      this.setState({status: 1 - status});
    } else {
      this.player.seek(0);
      this.setState({status: PLAYING});
    }
  }
  
  toTimeString(sec) {
    let _min = Math.floor(sec / 60);
    let _sec = Math.floor(sec - _min * 60);
    let _hour = Math.floor(_min / 60);
    _min = _min - _hour * 60;
    if (_sec < 10) _sec = '0' + _sec;
    let res = _min + ':' + _sec;
    if (_hour > 0) {
      if ( _min < 10) res = '0' + res;
      res = _hour + ':' + res;
    }
    return res;

  }

  onSeekStart = (evt) => {
    const { sliderStartX, sliderWidth } = this.state;
    const delta = evt.nativeEvent.pageX - sliderStartX;
    const seekPosition = delta / sliderWidth * 100;
    this.setState({ seekStatus: SEEKING, seekPosition});
  }

  onSeeking = (evt) => {
    const { sliderStartX, sliderWidth } = this.state;
    let delta = evt.nativeEvent.pageX - sliderStartX;
    if (delta < 0) delta = 0;
    if (delta > sliderWidth) delta = sliderWidth;
    const seekPosition = delta / sliderWidth * 100;
    this.setState({seekPosition});
  }

  onSeekEnd = (evt) => {
    const { duration, seekPosition } = this.state;
    const newPosition = duration / 100 * seekPosition;
    console.log(newPosition)
    this.player.seek(newPosition);
    this.setState({seekStatus: NOT_SEEKING});
  }

  render() {
    const { image } = this.props.navigation.state.params;
    const { status, duration, currentTime, seekStatus, seekPosition } = this.state;
    const progress = seekStatus === SEEKING ? seekPosition : currentTime / duration * 100;
    return (
      <View
        style={styles.container}
      >
        <Video
          source={image}
          ref={r => this.player = r}
          style={styles.backgroundVideo}
          resizeMode='contain'
          paused={status !== PLAYING}
          onReadyForDisplay={() => this.setState({status: PAUSED})}
          onLoad={this.onLoad.bind(this)}
          onProgress={this.onProgress.bind(this)}
          onEnd={this.onEnd.bind(this)}
        />

        <View style={styles.header}>
          <View style={styles.innerHeader}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                source={images.navtop_icon_backbutton}
                style={styles.navHamburger}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contollers}>
          <View style={styles.timenseek}>
            <Text style={styles.time}>{this.toTimeString(currentTime)}</Text>
            <View style={styles.slider}>
              <View ref={r => this.slider = r} style={styles.sliderBg}>
                <View style={[styles.progress, {width: `${progress}%`}]} />
              </View>
              <View
                onStartShouldSetResponder={(ev) => true}
                onResponderGrant={this.onSeekStart}
                onResponderMove={this.onSeeking}
                onResponderRelease={this.onSeekEnd}
                style={[styles.seeker, {left: `${progress}%`}]}
                activeOpacity={1}
              />
            </View>
            <Text style={styles.time}>{this.toTimeString(duration)}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={this.onPlayButtonPress.bind(this)}
            >
              <Image
                source={status === PLAYING ? images.icon_player_pause : images.icon_player_play}
                style={styles.playButton}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  header: {
    width: '100%',
    backgroundColor: '#0005',
    paddingTop: Platform.select({ ios: 20, android: 0 }),
    alignItems: 'center',
  },
  innerHeader: {
    width: '90%',
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navHamburger: {
    resizeMode: 'contain',
    width: width(5),
  },
  contollers: {
    position: 'absolute',
    width: '100%',
    height: 80,
    backgroundColor: '#0003',
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  timenseek: {
    width: '95%',
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    color: 'white'
  },
  slider: {
    flex: 1,
    height: 10,
    marginHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderBg: {
    flex: 1,
    height: 2,
    backgroundColor: 'white',
  },
  progress: {
    height: '100%',
    backgroundColor: 'red'
  },
  seeker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: -5,
    backgroundColor: 'red',
    position: 'absolute',
  },
  buttonsContainer: {

  },
  playButton: {
    width: 22,
    height: 22
  }
});

//make this component available to the app
export default VideoPlayerPage;
