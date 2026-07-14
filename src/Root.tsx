import React from 'react';
import {Composition} from 'remotion';
import {StorageVideo, FPS, DURATION_IN_FRAMES, WIDTH, HEIGHT} from './StorageVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="StorageUnit"
      component={StorageVideo}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
