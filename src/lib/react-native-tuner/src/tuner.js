// import Recording from "react-native-recording";
import React, {Component} from "react"
import PitchFinder from "pitchfinder";
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { Audio } from 'expo-av';
import { View } from "react-native";

export default class Tuner extends Component {

  constructor(sampleRate = 22050, bufferSize = 2048) {
    super()
    this.sampleRate = sampleRate;
    this.bufferSize = bufferSize;
  
    this.start();
  
    // this.state = {
    //   haveRecordingPermissions: false
    // }
    this.pitchFinder = new PitchFinder.YIN({ sampleRate: this.sampleRate });
  }
  
  getSample = async () => {
    const status = await this.recording.getStatusAsync();

    console.log('update', status);
    try {
      const rec = await this.recording.stopAndUnloadAsync();
      // this.setState({unloading: alse})
      
    } catch (error) {
      console.log({error});
      // Do nothing -- we are already unloaded.
    }
    const info = await FileSystem.getInfoAsync(this.recording.getURI());
    // const { sound } = await this.recording.createNewLoadedSound({
    //   isLooping: true,
    //   isMuted: this.state.muted,
    //   volume: this.state.volume,
    //   rate: this.state.rate,
    //   shouldCorrectPitch: this.state.shouldCorrectPitch,
    // }, this._updateScreenForSoundStatus
    // )
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    console.log({sound});
      const frequency = this.pitchFinder(info);
 
        const note = this.getNote(frequency);
        console.log({FileSystem});
        const dir = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory + '/AV/');
        console.log({dir});
        let dirRes = [];
        // for (var i = 0; i < dir.length; i++) {
        //   dirRes.push(await FileSystem.deleteAsync(dir[i]))
        // }
        const uri = this.recording.getURI().replace('///', '//'); //.replace('file:', '');
        debugger;
        const sound = await FileSystem.readAsStringAsync(uri);
    
    debugger;
  }

  start = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
    console.log({response});
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    });
    
    console.log('new');
    this.recording = new Audio.Recording();
    // this.recording = recording;
    // this.recording.setOnRecordingStatusUpdate(this.getSample)
    const hqOptions = Object.assign(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY, { sampleRate: this.sampleRate })
    console.log({hqOptions});
    await this.recording.prepareToRecordAsync(JSON.parse(JSON.stringify(hqOptions)));
    await this.recording.startAsync();
    setTimeout(this.getSample, 100)
    // await this.getSample()
    // await recording.prepareToRecordAsync(this.recordingSettings);
    // recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);
    // 
    // this.recording = recording;
    // if (this.recording !== null) {
    //   this.recording.setOnRecordingStatusUpdate(null);
    //   this.recording = null;
    // }
    // console.log('rec', this.recording);
    // 
    // await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
    // 
    // await this.stopPlaybackAndBeginRecording();
    // Recording.init({
    //   sampleRate: this.sampleRate,
    //   bufferSize: this.bufferSize
    // });
    // Recording.start();
    // Recording.addRecordingEventListener(data => {
    //   const frequency = this.pitchFinder(data);
    //   if (frequency && this.onNoteDetected) {
    //     const note = this.getNote(frequency);
    //     this.onNoteDetected({
    //       name: this.noteStrings[note % 12],
    //       value: note,
    //       cents: this.getCents(frequency, note),
    //       octave: parseInt(note / 12) - 1,
    //       frequency: frequency
    //     });
    //   }
    // });
  }

  /**
   * get musical note from frequency
   *
   * @param {number} frequency
   * @returns {number}
   */
  getNote = (frequency) => {
    const note = 12 * (Math.log(frequency / this.middleA) / Math.log(2));
    return Math.round(note) + this.semitone;
  }

  /**
   * get the musical note's standard frequency
   *
   * @param note
   * @returns {number}
   */
  getStandardFrequency = (note) => {
    return this.middleA * Math.pow(2, (note - this.semitone) / 12);
  }

  /**
   * get cents difference between given frequency and musical note's standard frequency
   *
   * @param {float} frequency
   * @param {int} note
   * @returns {int}
   */
  getCents = (frequency, note) => {
    return Math.floor(
      (1200 * Math.log(frequency / this.getStandardFrequency(note))) /
        Math.log(2)
    );
  }
  
  render = () => `<View/>`
  
}
