import React from 'react';
import {Composition} from 'remotion';
import {StorageVideo, FPS, DURATION_IN_FRAMES, WIDTH, HEIGHT} from './StorageVideo';
import {YahooReel, DURATION_IN_FRAMES as YAHOO_FRAMES} from './YahooReel';
import {LogoStill} from './Logo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="StorageUnit"
        component={StorageVideo}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="YahooReel"
        component={YahooReel}
        durationInFrames={YAHOO_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      {/* Utility comp: render to a transparent PNG for the watermark. */}
      <Composition id="Logo" component={LogoStill} durationInFrames={1} fps={30} width={800} height={200} />
    </>
  );
};
