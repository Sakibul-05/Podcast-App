import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import timeConverter from "../../../../functions/timeConverter";

const AudioPlayer = ({ playingFile, displayImage }) => {
  const { title, audioURL } = playingFile;
  const audioRef = useRef();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioURL) {
      audioRef.current.load();
      audioRef.current.addEventListener("canplaythrough", handleCanPlayThrough);
    }

    return () => {
      if (audioRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        audioRef.current.removeEventListener(
          "canplaythrough",
          handleCanPlayThrough
        );
      }
    };
  }, [audioURL]);

  const handleCanPlayThrough = () => {
    // The audio has loaded sufficiently; you can play it now
    audioRef.current.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [isMuted, volume]);

  const handleDurationChange = (e) => {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setCurrentTime(0);
    setIsPlaying(false);
  };

  return (
    <div className="custom-audio-player">
      <div className="flex-start">
        <div className="displayImage-container">
          <img
            src={displayImage}
            alt={title}
            className="custom-audio-player-image"
          />
        </div>
        <div className="title-container">
          <h4>{title}</h4>
        </div>
      </div>
      <div className="flex-center">
        <audio
          ref={audioRef}
          src={audioURL}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        ></audio>
        <div onClick={handlePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
        <div className="duration-flex">
          <p>{timeConverter(currentTime)}</p>
          <input
            type="range"
            value={currentTime}
            max={duration}
            step={0.01}
            onChange={handleDurationChange}
            className="duration-range"
          />
          <p>{timeConverter(duration)}</p>
        </div>
      </div>
      <div className="flex-end">
        <span onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </span>
        <input
          type="range"
          value={isMuted ? 0 : volume}
          max={1}
          min={0}
          step={0.1}
          onChange={handleVolumeChange}
          className="volume-range"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
