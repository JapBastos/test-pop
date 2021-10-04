import React from 'react';
import InputRange from 'react-input-range';
import { FaPlay, FaSpinner } from 'react-icons/fa'
import 'react-input-range/lib/css/index.css'
import './styles.css';

export const AudioClientContainer = ({ playState, progress, volumeLevel, audionState, loading, onPlayBtnClick, onVolumeChange, onStopBtnClick, onProgressClick }) =>
{
  /* console.log(playState);
  console.log(progress);
  console.log(volumeLevel)
  console.log(audionState)
  console.log(loading); */
  return (
    <div>
      <audio id="audio" src={playState.loadingProcess}>Pops</audio>
      <h4>AudioClient: <small className="text-muted">Sound Streaming</small></h4>

      {playState.loadingProcess}

      <div className="player mt-4">
        <div className="progress player-progress mb-2" onClick={onProgressClick}>
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{width: `${progress}%`}}
            aria-valuemax="100"
            onClick={e => console.log(e)}
          >
          </div>
          <div
            className="progress-bar bg-info"
            role="progressbar"
            style={{width: `${parseInt(audionState.loadingProcess, 10)}%`}}
            aria-valuemax="100"
          >
          </div>
        </div>
        <div className="player-controls mt-2">

          <div>{loading && <i><FaSpinner size={20}/></i>}</div>
          <button
            type="button"
            className="btn btn-warning"
            onClick={playState === 'play' ? onPlayBtnClick : onStopBtnClick}
            disabled={loading}>
            <i><FaPlay size={20} color="#f00" /></i>
          </button>

          <div className="player-volume-control">
            <i onClick={() => onVolumeChange({ max: 0 })} className="fas fa-volume-down"></i>
            <div className="range-select">
              <InputRange
                maxValue={100}
                minValue={0}
                value={{ min: 0, max: volumeLevel }}
                onChange={onVolumeChange}
              />
            </div>
            <i onClick={() => onVolumeChange({ max: 100 })}  className="fas fa-volume-up"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
