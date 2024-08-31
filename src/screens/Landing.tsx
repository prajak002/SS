"use client";

import { Leaf, Myxomycete } from "@/components";
import { Audio } from "@/screens";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

export const Landing: FC = () => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(true); // Start the transition
      const transitionTimer = setTimeout(() => {
        setIsTransitioning(false); // Transition has been completed
      }, 7000); // Wait for the transition to finish

      return () => clearTimeout(transitionTimer);
    }, 0); // Optional delay before the animation starts

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <div className={isTransitioning ? "animate-fade-out" : ""}>
        {isTransitioning && <Myxomycete />}
      </div>

      <div className={!isTransitioning ? "animate-fade-in" : ""}>
        {!isTransitioning && (
          <Leaf numberOfLeaves={21} leafPath="/thelastleaf.png">
            <Audio />
          </Leaf>
        )}
      </div>
    </>
  );
};
