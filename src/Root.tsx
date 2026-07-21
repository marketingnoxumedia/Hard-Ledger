import React from 'react';
import {Composition} from 'remotion';
import {StorageVideo, FPS, DURATION_IN_FRAMES, WIDTH, HEIGHT} from './StorageVideo';
import {YahooReel, DURATION_IN_FRAMES as YAHOO_FRAMES} from './YahooReel';
import {CarWashReel, DURATION_IN_FRAMES as CARWASH_FRAMES} from './CarWashReel';
import {AttReel, DURATION_IN_FRAMES as ATT_FRAMES} from './AttReel';
import {OwnershipReel, DURATION_IN_FRAMES as OWNERSHIP_FRAMES} from './OwnershipReel';
import {LaundromatReel, DURATION_IN_FRAMES as LAUNDROMAT_FRAMES} from './LaundromatReel';
import {InflationReel, DURATION_IN_FRAMES as INFLATION_FRAMES} from './InflationReel';
import {SciReel, DURATION_IN_FRAMES as SCI_FRAMES} from './SciReel';
import {QuibiReel, DURATION_IN_FRAMES as QUIBI_FRAMES} from './QuibiReel';
import {WasteReel, DURATION_IN_FRAMES as WASTE_FRAMES} from './WasteReel';
import {LifetimeReel, DURATION_IN_FRAMES as LIFETIME_FRAMES} from './LifetimeReel';
import {PestReel, DURATION_IN_FRAMES as PEST_FRAMES} from './PestReel';
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
      <Composition
        id="CarWashReel"
        component={CarWashReel}
        durationInFrames={CARWASH_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="AttReel"
        component={AttReel}
        durationInFrames={ATT_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="OwnershipReel"
        component={OwnershipReel}
        durationInFrames={OWNERSHIP_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="LaundromatReel"
        component={LaundromatReel}
        durationInFrames={LAUNDROMAT_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="InflationReel"
        component={InflationReel}
        durationInFrames={INFLATION_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="SciReel"
        component={SciReel}
        durationInFrames={SCI_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="QuibiReel"
        component={QuibiReel}
        durationInFrames={QUIBI_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="WasteReel"
        component={WasteReel}
        durationInFrames={WASTE_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="LifetimeReel"
        component={LifetimeReel}
        durationInFrames={LIFETIME_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="PestReel"
        component={PestReel}
        durationInFrames={PEST_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      {/* Utility comp: render to a transparent PNG for the watermark. */}
      <Composition id="Logo" component={LogoStill} durationInFrames={1} fps={30} width={800} height={200} />
    </>
  );
};
