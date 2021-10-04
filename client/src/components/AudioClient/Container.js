import { compose, lifecycle, withState, withHandlers, withProps } from 'recompose';
import { loadFile } from './utils';
import { AudioClientContainer } from './Component';

export const AudioClient = compose(
  withState('volumeLevel', 'setVolumeLevel', 100),
  withState('progress', 'setProgress', 0),
  withState('playState', 'setPlayState', 'play'),
  withState('loading', 'setLoading', false),
  withState('player', 'setPlayer', null),
  withState('duration', 'setDuration', 0),
  withState('audionState', 'setAudionState', {
    startedAt: null,
    loadingProcess: 0,
  }),
  withProps(({ audionState, setAudionState }) => ({
    changeAudionState: newState =>
      setAudionState({ ...audionState, ...newState }),
  })),
  withHandlers({
    onPlayBtnClick: (props) => async () => {
      const { player } = props;

      try {
        if(!player) {
          props.setLoading(true);
          const newPlayer = await loadFile(props);
          props.setLoading(false);
          props.setPlayer(newPlayer);

          return props.setPlayState('stop');
        }

        player.play(0);
        props.changeAudionState({ startedAt: Date.now() });

        return props.setPlayState('stop');
      } catch (e) {
        props.setLoading(false);
        console.log(e);
      }
    },
    onStopBtnClick: props => () => {
      const { player } = props;
      player && player.stop();
      props.setPlayState('play');
    },
    onVolumeChange: props => ({ max }) => {
      const value = max / 100;
      const level = value > 0.5 ? value * 2 : value * -2;
      props.player.setVolume(level || -1);

      props.setVolumeLevel(max || 0)
    },
    onProgressClick: props => (e) => {
      const { player, duration } = props;

      const rate = (e.clientX * 100) / e.target.offsetWidth;
      const playbackTime = (duration * rate) / 100;

      player && player.stop();
      player && player.play(playbackTime);

      props.setProgress(parseInt(rate, 10));
      props.changeAudionState({
        startedAt: Date.now() - playbackTime * 1000,
      });
    }
  }),
  lifecycle({
    componentDidMount() {
      setInterval(() => {
        const { startedAt } = this.props.audionState;
        const { duration } = this.props;

        if(startedAt) {
          const playbackTime = (Date.now() - startedAt) / 1000;
          const rate = parseInt((playbackTime * 100) / duration, 10);
          rate <= 100 && this.props.setProgress(rate);
        }
      },1000)
    }
  })
)(AudioClientContainer);
