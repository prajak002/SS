"use client";

import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useAudio } from "@/context";
import { MEDIA } from "@/constants";

const currentMedia = [MEDIA.SANAM_VIDEO, MEDIA.RP_VIDEO, MEDIA.SHEY_JE_VIDEO, MEDIA.ENDING];

export const Carousal: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [caption, setCaption] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const { play, isPlaying } = useAudio();
  const navigate = useRouter();

  useEffect(() => {
    setIsClient(true); // Indicate that we are on the client-side
  }, []);

  useEffect(() => {
    if (window.location.pathname !== "/Bokaboka") {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  }, []);

  useEffect(() => {
    if (currentIndex < currentMedia.length) {
      const src = currentMedia[currentIndex];
      let newCaption = "";
      switch (src) {
        case MEDIA.RP_VIDEO:
          newCaption = "গুনে গুনে দেখি অবেলার স্বপ্নটায়, আঁকা ছিলো কত শত কবিতায় ...";
          break;
        case MEDIA.SANAM_VIDEO:
          newCaption = "গুনগানের হাজার বুলি, শুধুই সময় নষ্ট ...";
          break;
        case MEDIA.SHEY_JE_VIDEO:
          newCaption = "আমার পুচকি...";
          break;
        case MEDIA.ENDING:
          newCaption = "২০ তম জন্মদিনে ভালো থাকিস";
          break;
        default:
          newCaption = "তুমি শ্যামলা বঙ্গদেশ, তুমি ইঙ্গো SMS ...";
      }
      setCaption(newCaption);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isPlaying) {
      play();
    }
  }, [play, isPlaying]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % currentMedia.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + currentMedia.length) % currentMedia.length);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-black">
      {showMessage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-4 rounded shadow-lg">
          <p>পেজটা খুলার আগে "/Bokaboka" লিখে নে main URL এর পাশে, তারপর রিফ্রেশ করিস।</p>
        </div>
      )}
      <Card className="w-full max-w-2xl h-auto flex flex-col bg-black relative">
        <div className="relative w-full h-96">
          {isClient && currentMedia.length > 0 && (
            <video
              className="w-full h-full object-cover"
              key={currentMedia[currentIndex]}
              src={currentMedia[currentIndex]}
              loop
              autoPlay
              muted
            >
              Your browser does not support the video tag.
            </video>
          )}
          {/* Left Arrow */}
          <IconButton
            onClick={handlePrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-25 text-white"
          >
            <ArrowBackIos />
          </IconButton>

          {/* Right Arrow */}
          <IconButton
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-25 text-white"
          >
            <ArrowForwardIos />
          </IconButton>
        </div>
        <CardContent>
          <div className="text-white text-center" dangerouslySetInnerHTML={{ __html: caption }} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Carousal;
