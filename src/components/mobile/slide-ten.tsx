import { DynamicBanner } from "../banners/dynamic-banner";
import { RuchallenBanner } from "../banners/ruchallen-banner";


export const SlideTen = () => {

  return (
    <div className="min-w-full flex flex-col items-center justify-center">
     <RuchallenBanner />
     <DynamicBanner />
    </div>
  );
};