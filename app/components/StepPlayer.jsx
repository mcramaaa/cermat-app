import React, { useRef, useEffect } from "react";
import { Video } from "expo-av";

const StepPlayer = ({ source, style }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    (async () => {
      if (videoRef.current) {
        await videoRef.current.loadAsync(source);
        await videoRef.current.playAsync();
        await videoRef.current.setIsLoopingAsync(true);
      }
    })();
  }, []);

  return <Video ref={videoRef} style={{ ...style }} resizeMode="contain" />;
};

export default StepPlayer;
