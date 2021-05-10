import React, { useEffect, useRef } from "react";

export default function VideoScroll() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Set up options for Observer API, root margin and pixel for when video can play
    let options = {
      rootMargin: "-60px 30px 0px",
      threshold: [0.25, 0.75],
    };

    // Set up callback function, when video is in view from threshold play else pause
    let handlePlay = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          // A checkout for when a link to a another page is clicked so the site doesn't crash
          if (videoRef.current === null) {
            return;
          } else {
            videoRef.current.pause();
          }
        }
      });
    };

    // Set up Observer API
    let observer = new IntersectionObserver(handlePlay, options);

    // Observer listen into changes of videoRef
    observer.observe(videoRef.current);
  });

  return (
    <>
      <video
        ref={videoRef}
        src='https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
      />
    </>
  );
}
