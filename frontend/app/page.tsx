"use client";

import { Particles } from "@/components/ui/particles";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { SplineScene } from "@/components/ui/splite";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import LearningPath from "./_components/learning-path";
import { Squares } from "@/components/ui/squares-background";

export default function Home() {
  const [caminho, setCaminho] = useState(false);

  const handleMostraProximoSection = () => {
    setCaminho((prev) => !prev);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full min-h-screen bg-black"
    >
      <SmoothCursor />
      {caminho && (
        <Squares
  direction="diagonal"
      speed={0.5}
      squareSize={40}
      borderColor="#333"
      hoverFillColor="#222"
      className="absolute inset-0 w-full h-full z-0"
        />
      )}

      {!caminho && (
        <>
          <Particles
            className="absolute inset-0 z-0 h-vh"
            quantity={100}
            ease={80}
            color={"#ffffff"}
            refresh
          />
          <div className="grid lg:grid-cols-[2fr_3fr] min-h-screen">
            {/* Texto lado esquerdo */}
            <div className="flex items-center justify-center p-8 lg:p-16">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.h1
                    className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Desmistificando Exoplanetas
                  </motion.h1>
                  <motion.p
                    className="text-lg md:text-xl text-white/70 mb-8 text-pretty"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Descubra uma nova experiência interativa que vai te ensinar
                    tudo sobre Exoplanetas.
                  </motion.p>
                  <motion.button
                    className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleMostraProximoSection}
                  >
                    Começar agora
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </motion.button>
                </motion.div>
              </div>
            </div>
            {/* Cena 3D lado direito */}
            <motion.div
              className="relative h-[50vh] lg:h-screen"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </motion.div>
          </div>
        </>
      )}

      {caminho && (
        <div className="absolute inset-0 z-10">
          <LearningPath />
        </div>
      )}
    </motion.main>
  );
}