import React from "react";
import SampleButton from './SampleButton';

const Load = ({ handleUpload, loadHalfling, loadKennedy, loadShakespeare, loadTudor, loadGOT, loadKardashian, showError }) => {
  return (
    <div id='load'>
      <div>
        <section className='button-area'>
          <SampleButton
          name={'Halfling'}
          loadFile={loadHalfling}
          />
        </section>
      </div>
    </div>
  )
}

export default Load;
