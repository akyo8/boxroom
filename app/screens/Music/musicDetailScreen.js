//import liraries
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Slider from 'react-native-slider';
import Sound from 'react-native-sound';
import { width } from 'react-native-dimension';

import images from '../../const/images';

let sound;

// create a component
class MusicDetailScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            like: false,
            current: 0,
            duration: 0,
            playing: false,
            systemVolume: 0,
        }

        // Sound.setCategory('Playback', false);
        const item = props.navigation.state.params;
        sound = new Sound(item.url, '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            // loaded successfully
            sound.play();
            sound.getCurrentTime((seconds) => {
                console.log(seconds);
            });
            this.setState({
                current: 0,
                duration: sound.getDuration(),
                playing: true,
            });
            this.tickInterval = setInterval(() => { this.tick(); }, 250);
        });
    }

    componentWillUnmount() {
        sound.release();
        clearInterval(this.tickInterval);
    }

    tick = () => {
        const { current, playing } = this.state;
        sound.getCurrentTime((second) => {
            if (playing && current === second) {
                // stopped
                sound.stop(() => {
                    sound.setCurrentTime(0);
                    this.setState({
                        playing: false,
                    });
                });
                return;
            }
            this.setState({
                current: second,
            });
        });
    }

    getTimeString = (second) => {
        let res;
        let sec = Math.floor(second);
        const min = Math.floor(sec / 60);
        sec = sec - min * 60;
        res = (min < 10 ? '0' : '') + min + ':';
        res += (sec < 10 ? '0' : '') + sec;
        return res;
    }

    onSeek = (value) => {
        this.setState({
            current: value,
        });
        sound.setCurrentTime(value);
    }

    play = () => {
        const { playing } = this.state;
        if (playing) {
            sound.pause();
        } else {
            sound.play();
        }
        this.setState({
            playing: !playing,
        });
    }
    
    renderAlbumThumb = ({item}) => {
        return (
            <Image
                style={styles.thumbnail}
                source={item}
            />
        )
    }

    render() {
        const {
            like,
            current,
            duration,
            playing,
        } = this.state;
        const item = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.goBack(); }}
                    >
                        <Image
                            source={images.icon_close}
                            style={styles.closeButton}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.carousel}>
                    <Carousel
                        data={[images.image_album, images.image_album, images.image_album]}
                        sliderWidth={width(100)}
                        itemWidth={width(55)}
                        loop
                        inactiveSlideScale={0.8}
                        renderItem={this.renderAlbumThumb}
                    />
                </View>

                <View style={styles.musicInfoContainer}>
                    <TouchableOpacity
                        style={styles.likeButton}
                        onPress={() => { this.setState({ like: !like }); }}
                    >
                        <Image
                            source={like ? images.icon_like : images.icon_unlike}
                            style={styles.buttonIcon}
                        />
                    </TouchableOpacity>
                    <View style={styles.musicInfo}>
                        <Text style={styles.song}>{item.name ? item.name.split('_')[1].split('.')[0] : 'Unknown'}</Text>
                        <Text style={styles.album}>{item.album ? item.album : 'Unknown'}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.optionButton}
                    >
                        <Image
                            source={images.icon_detail_menu}
                            style={styles.buttonIcon}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.seekerContainer}>
                    <Slider
                        maximumValue={duration}
                        value={current}
                        onSlidingComplete={this.onSeek}
                        thumbTintColor='#36afca'
                        thumbTouchSize={{ width: 20, height: 20 }}
                        thumbStyle={{ width: 15, height: 15 }}
                        trackStyle={{ height: 2.5 }}
                        minimumTrackTintColor='#36afca'
                        maximumTrackTintColor='#a9a9a9'
                        style={styles.seeker}
                    />
                    <View style={styles.timesView}>
                        <Text style={styles.timeText}>{this.getTimeString(current)}</Text>
                        <Text style={styles.timeText}>{this.getTimeString(duration)}</Text>
                    </View>
                </View>

                <View style={styles.controlsContainer}>
                    <TouchableOpacity
                    >
                        <Image
                            source={images.icon_player_repeat}
                            style={styles.controlIcon}
                        />
                    </TouchableOpacity>
                    <View style={styles.innerControlsContainer}>
                        <TouchableOpacity
                        >
                            <Image
                                source={images.icon_player_prev}
                                style={styles.controlIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.playButton}
                            onPress={this.play}
                        >
                            <Image
                                source={playing ? images.icon_player_pause_black : images.icon_player_play_black}
                                style={styles.controlIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                        >
                            <Image
                                source={images.icon_player_next}
                                style={styles.controlIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                    >
                        <Image
                            source={images.icon_player_shuffle}
                            style={styles.controlIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    header: {
        alignSelf: 'flex-start',
        padding: 25,
    },
    closeButton: {
        width: 22,
        height: 22,
    },
    carousel: {
        height: width(55),
        marginVertical: 30,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    musicInfoContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    likeButton: {
        width: 24,
        height: 24,
    },
    optionButton: {
        width: 20,
        height: 20,
    },
    buttonIcon: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    musicInfo: {
        width: width(60),
        alignItems: 'center',
    },
    song: {
        fontSize: 19,
        color: '#36afca',
        marginBottom: 7,
    },
    album: {
    },
    seekerContainer: {
        width: width(85),
    },
    seeker: {
        margin: 0,
        padding: 0,
    },
    timesView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    timeText: {
        fontSize: 11,
        color: '#a9a9a9',
    },
    controlsContainer: {
        width: width(82),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    innerControlsContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    controlIcon: {
        width: 22,
        height: 22,
        resizeMode: 'contain',
    },
    playButton: {
        marginHorizontal: 40,
    }
});

//make this component available to the app
export default MusicDetailScreen;
