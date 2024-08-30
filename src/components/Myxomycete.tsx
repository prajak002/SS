"use client";

import { useEffect, useRef } from "react";
import p5 from "p5";

export const Myxomycete = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const p5 = require("p5");

      let molds: Eukaryote[] = [];
      const numberOfMolds = 5441;

      class Eukaryote {
        x: number;
        y: number;
        r: number;
        heading: number;
        vx: number;
        vy: number;
        rotAngle: number;
        stop: boolean;
        rSensorPos: p5.Vector;
        lSensorPos: p5.Vector;
        fSensorPos: p5.Vector;
        sensorAngle: number;
        sensorDist: number;

        constructor(p: p5) {
          this.x = p.random(p.width);
          this.y = p.random(p.height);
          this.r = 0.5;
          this.heading = p.random(360);
          this.vx = p.cos(this.heading);
          this.vy = p.sin(this.heading);
          this.rotAngle = 45;
          this.stop = false;
          this.rSensorPos = p.createVector(0, 0);
          this.lSensorPos = p.createVector(0, 0);
          this.fSensorPos = p.createVector(0, 0);
          this.sensorAngle = 45;
          this.sensorDist = 10;
        }

        update(p: p5) {
          if (this.stop) {
            this.vx = 0;
            this.vy = 0;
          } else {
            this.vx = p.cos(this.heading);
            this.vy = p.sin(this.heading);
          }

          this.x = (this.x + this.vx + p.width) % p.width;
          this.y = (this.y + this.vy + p.height) % p.height;

          this.getSensorPos(
            this.rSensorPos,
            this.heading + this.sensorAngle,
            p,
          );
          this.getSensorPos(
            this.lSensorPos,
            this.heading - this.sensorAngle,
            p,
          );
          this.getSensorPos(this.fSensorPos, this.heading, p);

          const d = p.pixelDensity();
          let index =
            4 * (d * p.floor(this.rSensorPos.y)) * (d * p.width) +
            4 * (d * p.floor(this.rSensorPos.x));
          let r = p.pixels[index];

          index =
            4 * (d * p.floor(this.lSensorPos.y)) * (d * p.width) +
            4 * (d * p.floor(this.lSensorPos.x));
          let l = p.pixels[index];

          index =
            4 * (d * p.floor(this.fSensorPos.y)) * (d * p.width) +
            4 * (d * p.floor(this.fSensorPos.x));
          let f = p.pixels[index];

          if (f > l && f > r) {
            this.heading += 0;
          } else if (f < l && f < r) {
            if (p.random(1) < 0.5) {
              this.heading += this.rotAngle;
            } else {
              this.heading -= this.rotAngle;
            }
          } else if (l > r) {
            this.heading += -this.rotAngle;
          } else if (r > l) {
            this.heading += this.rotAngle;
          }
        }

        display(p: p5) {
          p.noStroke();
          p.fill(255);
          p.ellipse(this.x, this.y, this.r * 2, this.r * 2);
        }

        getSensorPos(sensor: p5.Vector, angle: number, p: p5) {
          sensor.x =
            (this.x + this.sensorDist * p.cos(angle) + p.width) % p.width;
          sensor.y =
            (this.y + this.sensorDist * p.sin(angle) + p.height) % p.height;
        }
      }

      const sketch = (p: p5) => {
        p.setup = () => {
          p.createCanvas(p.windowWidth, p.windowHeight);
          p.angleMode(p.DEGREES);
          for (let i = 0; i < numberOfMolds; i++) {
            molds[i] = new Eukaryote(p);
          }
        };

        p.draw = () => {
          p.background(0, 5);
          p.loadPixels();

          for (let i = 0; i < numberOfMolds; i++) {
            molds[i].update(p);
            molds[i].display(p);
          }
        };

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
      };

      const p5Instance = new p5(sketch, sketchRef.current!);

      return () => {
        p5Instance.remove();
      };
    }
  }, []);

  return (
    <div>
      <div ref={sketchRef} className="fade-in" style={{ position: "relative" }}></div>
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10,
      }}>
        <a href="https://ss-notes.vercel.app/" target="_blank" rel="noopener noreferrer">
          <button style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}>
           Just for you
          </button>
        </a>
      </div>
    </div>
  );
};
