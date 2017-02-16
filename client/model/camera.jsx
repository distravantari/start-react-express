import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

export default class Webcam extends Component {
  static get defaultProps() {
    return {
      audio: false,
      height: 1580,
      width: 1640,
      screenshotFormat: 'image/png',
      onUserMedia: () => {}
    };
  }

  static get propTypess() {
    return{
      audio: PropTypes.bool,
      muted: PropTypes.bool,
      onUserMedia: PropTypes.func,
      height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]),
      width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]),
      screenshotFormat: PropTypes.oneOf([
        'image/webp',
        'image/png',
        'image/jpeg'
      ]),
      className: PropTypes.string
    }
  };

  constructor() {
    super();
    this.state = {
      mediaRequest: false,
      hasUserMedia: false,
      mountedInstances: []
    };
  }

  componentDidMount() {
    if (!hasGetUserMedia()) return;

    this.state.mountedInstances.push(this);

    if (!this.state.hasUserMedia && !this.state.mediaRequest){
      this.requestUserMedia();
    }
  }

  requestUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

    let sourceSelected = (audioSource, videoSource) => {
      let constraints = {
        video: {
          optional: [{sourceId: videoSource}]
        }
      };

      if (this.props.audio) {
        constraints.audio = {
          optional: [{sourceId: audioSource}]
        };
      }

      navigator.getUserMedia(constraints, (stream) => {
        this.state.mountedInstances && this.state.mountedInstances.forEach((instance) => {
          instance.handleUserMedia(null, stream)
        });
      }, (e) => {
         this.state.mountedInstances && this.state.mountedInstances.forEach((instance) => {
           instance.handleUserMedia(e)
         });
      });
    };

    if (this.props.audioSource && this.props.videoSource) {
      sourceSelected(this.props.audioSource, this.props.videoSource);
    } else {
      if ('mediaDevices' in navigator) {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
          let audioSource = null;
          let videoSource = null;

          devices.forEach((device) => {
            if (device.kind === 'audio') {
              audioSource = device.id;
            } else if (device.kind === 'video') {
              videoSource = device.id;
            }
          });

          sourceSelected(audioSource, videoSource);
        })
        .catch((error) => {
          console.log(`${error.name}: ${error.message}`); // eslint-disable-line no-console
        });
      } else {
        MediaStreamTrack.getSources((sources) => {
          let audioSource = null;
          let videoSource = null;

          sources.forEach((source) => {
            if (source.kind === 'audio') {
              audioSource = source.id;
            } else if (source.kind === 'video') {
              videoSource = source.id;
            }
          });

          sourceSelected(audioSource, videoSource);
        });
      }
    }

    this.setState({
      mediaRequest: true
    })
  }

  handleUserMedia(error, stream) {
    if (error) {
      this.setState({
        hasUserMedia: false
      });

      return;
    }

    let src = window.URL.createObjectURL(stream);

    this.stream = stream;
    this.setState({
      hasUserMedia: true,
      src
    });

    this.props.onUserMedia();
  }

  componentWillUnmount() {
    let index = this.state.mountedInstances.indexOf(this);
    this.state.mountedInstances.splice(index, 1);

    if (this.state.mountedInstances.length === 0 && this.state.hasUserMedia) {
      if (this.stream.stop) {
        this.stream.stop();
      } else {
        if (this.stream.getVideoTracks) {
          for (let track of this.stream.getVideoTracks()) {
            track.stop();
          }
        }
        if (this.stream.getAudioTracks) {
          for (let track of this.stream.getAudioTracks()) {
            track.stop();
          }
        }
      }
      this.setState({
        mediaRequest: false
      })
      window.URL.revokeObjectURL(this.state.src);
    }
  }

  getScreenshot() {
    if (!this.state.hasUserMedia) return null;

    let canvas = this.getCanvas();
    let newImg = document.createElement('img');

    canvas.toBlob((blob) => {
      let url = URL.createObjectURL(blob);

      newImg.onload = () => {
        // no longer need to read the blob so it's revoked
        URL.revokeObjectURL(url);
      };

      newImg.src = url;
    });
    
    return canvas.toDataURL(this.props.screenshotFormat);
  }

  getCanvas() {
    if (!this.state.hasUserMedia) return null;

    const video = findDOMNode(this);
    if (!this.ctx) {
      let canvas = document.createElement('canvas');
      const aspectRatio = video.videoWidth / video.videoHeight;

      canvas.width = video.clientWidth;
      canvas.height = video.clientWidth / aspectRatio;

      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
    }

    const {ctx, canvas} = this;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas;
  }

  render() {
    return (
      <video
        autoPlay
        width={this.props.width}
        height={this.props.height}
        src={this.state.src}
        muted={this.props.muted}
        className={this.props.className}
      />
    );
  }
}