"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { LYRICS } from "@/constants";
import { useAudio, useDarkMode } from "@/context";

export const Audio: FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [firstLoopCompleted, setFirstLoopCompleted] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showSanamButton, setShowSanamButton] = useState(true); // Tracks if "Built by Sanam" button should be shown
  const [sanamAnimation, setSanamAnimation] = useState("animate-pulse z-50"); // Tracks the animation of the Sanam button
  const [showMusicButton, setShowMusicButton] = useState(false); // Tracks if music button should be shown
  const [musicAnimation, setMusicAnimation] = useState("animate-pulse z-50"); // Tracks the animation of the Music button
  const navigate = useRouter();
  const { play, isPlaying } = useAudio();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    let wakeLock: WakeLockSentinel | null;

    const requestWakeLock = async () => {
      try {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("Wake lock activated");
      } catch (error) {
        console.error("Failed to activate wake lock:", error);
      }
    };

    const releaseWakeLock = () => {
      if (wakeLock) {
        wakeLock.release();
        wakeLock = null;
        console.log("Wake lock released");
      }
    };

    if (isVisible && !firstLoopCompleted) {
      requestWakeLock();

      const interval = setInterval(() => {
        setCurrentLineIndex((prevIndex) => {
          if ((prevIndex + 1) % LYRICS.length === 0) {
            setFirstLoopCompleted(true);
            navigate.push("/kigotumi");
          }
          return (prevIndex + 1) % LYRICS.length;
        });
      }, 5000); // beat duration

      return () => {
        clearInterval(interval);
        releaseWakeLock();
      };
    }

    return () => {
      releaseWakeLock();
    };
  }, [isVisible, firstLoopCompleted, navigate]);

  const handleSanamClick = () => {
    setShowSanamButton(false); // Hide Sanam button
    setShowMusicButton(true); // Show music button
  };

  const handleMusicClick = () => {
    if (!isPlaying) {
      play(); // Start playing the audio
    }
    setIsVisible(true); // Show the lyrics
    setShowMusicButton(false); // Hide the music button
  };

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {showSanamButton && (
            <Button
              id="sanamButton"
              variant="outlined"
              color="error"
              endIcon={<FavoriteTwoToneIcon />}
              onClick={handleSanamClick}
              className={sanamAnimation}
            >
             
              <i> তোমাকেই ভালবাসবো ভেবেছি শত যুদ্ধের শেষে </i>
            </Button>
          )}
          {showMusicButton && (
            <Button
              id="musicButton"
              variant="outlined"
              endIcon={<PlayCircleOutlineOutlinedIcon />}
              onClick={handleMusicClick}
              sx={{ marginBottom: "1rem" }}
              className={musicAnimation}
            >
              {/* Music */}
              <i> কিরে পুচকু শুরু করি? </i>
            </Button>
          )}
          {isVisible && !firstLoopCompleted && (
            <p
              key={currentLineIndex}
              className={`tiro-bangla-regular text-red-500 hover:text-black ${currentLineIndex !== 0 && darkMode ? "gradient-lyrics" : ""}`}
            >
              {LYRICS[currentLineIndex]}
            </p>
          )}
        </Box>
        <Box
          sx={{
            position: "fixed",
            bottom: "0px",
            left: "50%",
            marginLeft: "33px",
            transform: "translateX(-50%)",
          }}
        >
          <p
            className="font-lvs text-4xl mb-4 text-red-500 hover:text-black hover: cursor-pointer"
            onClick={() => {
              showMusicButton
                ? setMusicAnimation("animate-bounce")
                : setSanamAnimation("animate-bounce");
            }}
          >
            {" "}
            {/* withlovebokaboka */}
            With❤️ from prajak{" "}
          </p>
        </Box>
      </Container>
    </>
  );
};
