"use client"

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react"
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion"

// importa suas imagens locais
import exoplaneta01 from "../../assets/svg/exoplanetas-png/exoplaneta01.webp"
import exoplaneta002 from "../../assets/svg/exoplanetas-png/exoplaneta002.jpg"
import exoplaneta003 from "../../assets/svg/exoplanetas-png/exoplaneta003.jpg"
import exoplaneta004 from "../../assets/svg/exoplanetas-png/exoplaneta004.webp"

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

// Hook para media query
type UseMediaQueryOptions = {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

const IS_SERVER = typeof window === "undefined"

export function useMediaQuery(
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => {
    if (IS_SERVER) return defaultValue
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) return getMatches(query)
    return defaultValue
  })

  const handleChange = () => setMatches(getMatches(query))

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query)
    handleChange()
    matchMedia.addEventListener("change", handleChange)
    return () => matchMedia.removeEventListener("change", handleChange)
  }, [query])

  return matches
}

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1], filter: "blur(4px)" }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

const Carousel = memo(
  ({
    handleClick,
    controls,
    cards,
    isCarouselActive,
  }: {
    handleClick: (imgUrl: string, index: number) => void
    controls: any
    cards: string[]
    isCarouselActive: boolean
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    const cylinderWidth = isScreenSizeSm ? 600 : 1000
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const rotation = useMotionValue(0)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: "800px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={(_, info) =>
            isCarouselActive &&
            rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) =>
            isCarouselActive &&
            controls.start({
              rotateY: rotation.get() + info.velocity.x * 0.05,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.1,
              },
            })
          }
          animate={controls}
        >
          {cards.map((imgUrl, i) => (
            <motion.div
              key={`key-${i}`}
              className="absolute flex h-[70%] origin-center items-center justify-center rounded-xl bg-mauve-dark-2 p-1"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(imgUrl, i)}
            >
              <motion.img
                src={imgUrl}
                alt={`exoplaneta-${i}`}
                layoutId={`img-${imgUrl}`}
                className="pointer-events-none w-full rounded-xl object-cover aspect-square"
                initial={{ filter: "blur(4px)" }}
                layout="position"
                animate={{ filter: "blur(0px)" }}
                transition={transition}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)

function ThreeDPhotoCarousel() {
  const [activeImg, setActiveImg] = useState<string | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const controls = useAnimation()

  // usa suas imagens importadas
  const cards = useMemo(
    () => [exoplaneta01.src, exoplaneta002.src, exoplaneta003.src, exoplaneta004.src],
    []
  )

  const handleClick = (imgUrl: string) => {
    setActiveImg(imgUrl)
    setIsCarouselActive(false)
    controls.stop()
  }

  const handleClose = () => {
    setActiveImg(null)
    setIsCarouselActive(true)
  }

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            layoutId={`img-container-${activeImg}`}
            layout="position"
            onClick={handleClose}
            className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50 m-4 md:m-20 lg:mx-[10rem] rounded-2xl"
            transition={transitionOverlay}
          >
            <div className="flex items-center justify-center w-full h-full">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{
                  delay: 0.6,
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="max-w-[40%] p-4 text-left text-white"
              >
                <h3 className="text-xl font-bold mb-2">O que é um exoplaneta?</h3>
                <p className="text-sm mb-2">
                  Um exoplaneta é um planeta que orbita uma estrela fora do nosso Sistema Solar. Diferente dos planetas que conhecemos, como Terra ou Marte, eles estão localizados em outros sistemas estelares, muitas vezes a anos-luz de distância.
                </p>
                <p className="text-sm mb-2">
                  Esses planetas podem ser muito diferentes: alguns são gigantes gasosos, como Júpiter, enquanto outros são rochosos e potencialmente habitáveis. Sua descoberta ajuda os cientistas a entenderem como os sistemas planetários se formam.
                </p>
                <p className="text-sm mb-2">
                  A busca por exoplanetas começou a acelerar com tecnologias como o telescópio Kepler. Hoje, milhares já foram identificados, e muitos são estudados para encontrar sinais de água ou vida.
                </p>
                <p className="text-sm mb-2">
                  Exoplanetas desafiam nossa imaginação, variando de mundos cobertos de lava a planetas com oceanos globais. Cada um oferece pistas sobre a diversidade do universo.
                </p>
                <p className="text-sm">
                  Estudar exoplanetas é um passo para responder uma grande pergunta: existe vida em outros lugares do cosmos? Eles são janelas para o desconhecido!
                </p>
              </motion.div>
              <motion.img
                layoutId={`img-${activeImg}`}
                src={activeImg}
                className="max-w-[50%] max-h-[80%] rounded-lg shadow-lg"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[400px] w-full overflow-hidden">
        <Carousel
          handleClick={handleClick}
          controls={controls}
          cards={cards}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </motion.div>
  )
}

export { ThreeDPhotoCarousel }