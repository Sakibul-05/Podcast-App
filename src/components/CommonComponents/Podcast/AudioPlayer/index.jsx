import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const AudioPlaer = ({ title, playingFile, displayImage }) => {
  const audioRef = useRef();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  function hnadleDuration(e) {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  }

  function hnadleVolume(e) {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  }

  // useEffect(() => {
  //   setDuration(audioRef.current.duration);
  // }, [audioRef]);

  function handleTimeUpdate() {
    setCurrentTime(audioRef.current.currentTime);
  }

  function handleLoadedMetadata() {
    setDuration(audioRef.current.duration);
  }

  function handleEnded() {
    setCurrentTime(0);
    setIsPlaying(false);
  }

  // useEffect(() => {
  //   const audio = audioRef.current;
  //   audio.addEventListener("timeupdate", handleTimeUpdate);
  //   audio.addEventListener("loadedmetadata", handleLoadedMetadata);
  //   audio.addEventListener("ended", handleEnded);

  //   return () => {
  //     audio.removeListener("timeupdate", handleTimeUpdate);
  //     audio.removeListener("loadedmetadata", handleLoadedMetadata);
  //     audio.removeListener("ended", handleEnded);
  //   };
  // }, [audioRef]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isMuted) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = volume;
    }
  }, [isMuted, volume]);

  return (
    <div className="custom-audio-player">
      <div className="flex-start">
        <div className="displayImage-container">
          <img
            src={displayImage}
            alt={title}
            className="custome-audio-player-image"
          />
        </div>
        <div className="title-container">
          <h4>{title}</h4>
        </div>
      </div>
      <div className="flex-center">
        <audio ref={audioRef} src={playingFile}></audio>
        <div onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </div>
        <div className="duration-flex">
          <p>0:00</p>
          <input
            type="range"
            value={currentTime}
            max={duration}
            step={0.01}
            onChange={hnadleDuration}
            className="duration-range"
          />
          <p>-21:00</p>
        </div>
      </div>
      <div className="flex-end">
        <span>
          {isMuted ? (
            <FaVolumeMute onClick={() => setIsMuted(!isMuted)} />
          ) : (
            <FaVolumeUp onClick={() => setIsMuted(!isMuted)} />
          )}
        </span>
        <input
          type="range"
          value={volume}
          max={1}
          min={0}
          step={0.1}
          onChange={hnadleVolume}
          className="volume-range"
        />
      </div>
    </div>
  );
};

export default AudioPlaer;
