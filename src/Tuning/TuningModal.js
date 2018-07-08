import React from 'react'
import Tuning from './Tuning'
import Modal from 'react-native-modal'

export const TuningModal = ({showTuningModal, tuning, onSave}) =>{

  return <Modal
    isVisible={showTuningModal}
    supportedOrientations={['landscape']} >
    <Tuning
      tuning={tuning}
      onSave={ newTuning => onSave({
        tuning: newTuning
      })} />
  </Modal>
}
