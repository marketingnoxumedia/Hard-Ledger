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
import {ParcReel, DURATION_IN_FRAMES as PARC_FRAMES} from './ParcReel';
import {RefundReel, DURATION_IN_FRAMES as REFUND_FRAMES} from './RefundReel';
import {CintasReel, DURATION_IN_FRAMES as CINTAS_FRAMES} from './CintasReel';
import {ToysReel, DURATION_IN_FRAMES as TOYS_FRAMES} from './ToysReel';
import {PayFirstReel, DURATION_IN_FRAMES as PAYFIRST_FRAMES} from './PayFirstReel';
import {VulcanReel, DURATION_IN_FRAMES as VULCAN_FRAMES} from './VulcanReel';
import {SearsReel, DURATION_IN_FRAMES as SEARS_FRAMES} from './SearsReel';
import {FeeReel, DURATION_IN_FRAMES as FEE_FRAMES} from './FeeReel';
import {FastenalReel, DURATION_IN_FRAMES as FASTENAL_FRAMES} from './FastenalReel';
import {QwiksterReel, DURATION_IN_FRAMES as QWIKSTER_FRAMES} from './QwiksterReel';
import {MillionaireReel, DURATION_IN_FRAMES as MILLIONAIRE_FRAMES} from './MillionaireReel';
import {WaterReel, DURATION_IN_FRAMES as WATER_FRAMES} from './WaterReel';
import {CokeReel, DURATION_IN_FRAMES as COKE_FRAMES} from './CokeReel';
import {RatioReel, DURATION_IN_FRAMES as RATIO_FRAMES} from './RatioReel';
import {LabelReel, DURATION_IN_FRAMES as LABEL_FRAMES} from './LabelReel';
import {PhantomReel, DURATION_IN_FRAMES as PHANTOM_FRAMES} from './PhantomReel';
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
      <Composition
        id="ParcReel"
        component={ParcReel}
        durationInFrames={PARC_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="RefundReel"
        component={RefundReel}
        durationInFrames={REFUND_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="CintasReel"
        component={CintasReel}
        durationInFrames={CINTAS_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="ToysReel"
        component={ToysReel}
        durationInFrames={TOYS_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="PayFirstReel"
        component={PayFirstReel}
        durationInFrames={PAYFIRST_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="VulcanReel"
        component={VulcanReel}
        durationInFrames={VULCAN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="SearsReel"
        component={SearsReel}
        durationInFrames={SEARS_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="FeeReel"
        component={FeeReel}
        durationInFrames={FEE_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="FastenalReel"
        component={FastenalReel}
        durationInFrames={FASTENAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="QwiksterReel"
        component={QwiksterReel}
        durationInFrames={QWIKSTER_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="MillionaireReel"
        component={MillionaireReel}
        durationInFrames={MILLIONAIRE_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="WaterReel"
        component={WaterReel}
        durationInFrames={WATER_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="CokeReel"
        component={CokeReel}
        durationInFrames={COKE_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="RatioReel"
        component={RatioReel}
        durationInFrames={RATIO_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="LabelReel"
        component={LabelReel}
        durationInFrames={LABEL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="PhantomReel"
        component={PhantomReel}
        durationInFrames={PHANTOM_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      {/* Utility comp: render to a transparent PNG for the watermark. */}
      <Composition id="Logo" component={LogoStill} durationInFrames={1} fps={30} width={800} height={200} />
    </>
  );
};
