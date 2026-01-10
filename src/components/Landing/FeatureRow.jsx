import React from "react";
import VideoFeature from "./VideoFeature";
import Image from "next/image";

const FeatureRow = ({ title, description, change, count, src }) => {
  return (
    <div
      className={`feature-${count} max-w-5xl w-full flex ${
        change
          ? "md:flex-row flex-col-reverse"
          : "md:flex-row-reverse flex-col-reverse"
      } items-center md:gap-10 gap-7 border-white mx-auto`}
    >
      <div className="w-full">
        <h4
          className={`md:text-4xl text-3xl text-center md:text-left md:mb-5 mb-3 text-(--color-secondary) font-semibold`}
        >
          {title}
        </h4>
        <p
          className={`text-[#f1f1f1] text-md text-center md:text-left w-[80%] md:mx-0 mx-auto`}
        >
          {description}
        </p>
      </div>
      {/* right */}
      <VideoFeature title={"NusaBatik"} change={change}>
        <Image
          src={src}
          width={0}
          height={0}
          alt="feature GIF"
          className="w-full h-auto"
        />
      </VideoFeature>
    </div>
  );
};

export default FeatureRow;
