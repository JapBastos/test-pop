import { useState } from 'react';

export function AudioClient(props) {
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const [playState, setPlayState] = useState('play');
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState(null);
  const [duration, setDuration] = useState (0);
  const [audioState, setAudioState] = useState({
    startedAt: null,
    loadingProcess: 0
  });

  
}