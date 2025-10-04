"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel"
import UnderstandExoplanet from "./understand-exoplanet"
import { Component } from "@/components/ui/ai-loader"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] }

export default function LearningPath() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()

  const handleOpenModalExplicacaoExoplaneta = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleRedirectChatAi = () => {
    router.push('/chat')
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <AnimatePresence mode="sync">
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              layoutId="modal-explicacao-exoplaneta"
              layout="position"
              onClick={handleCloseModal}
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
                  <h3 className="text-xl font-bold mb-2">
                    Métodos de Classificação de Exoplanetas
                  </h3>
                  <p className="text-sm mb-2">
                    Exoplanetas são identificados e classificados usando métodos avançados que observam seus efeitos nas estrelas. Três técnicas principais ajudam os cientistas a detectar esses mundos distantes de forma precisa.
                  </p>
                  <p className="text-sm mb-2">
                    O <strong>método de trânsito</strong> observa a diminuição no brilho de uma estrela quando um exoplaneta passa na sua frente. Essa pequena sombra revela a presença do planeta e permite estimar seu tamanho.
                  </p>
                  <p className="text-sm mb-2">
                    A <strong>velocidade radial</strong> detecta o movimento de uma estrela causado pela gravidade de um exoplaneta em órbita. Esse "bamboleio" estelar, medido por espectroscopia, indica a massa e a órbita do planeta.
                  </p>
                  <p className="text-sm mb-2">
                    A <strong>imagem direta</strong> é usada para capturar imagens de exoplanetas, especialmente os maiores e mais distantes de suas estrelas. Telescópios avançados bloqueiam a luz estelar para revelar esses mundos.
                  </p>
                  <p className="text-sm">
                    Cada método contribui para nossa compreensão dos exoplanetas, revelando características como tamanho, massa e possibilidade de habitabilidade. Juntos, eles abrem portas para explorar o universo!
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-full max-w-2xl flex flex-col items-center">
          <ThreeDPhotoCarousel />
          <p className="relative italic text-gray-400/80 tracking-wide text-center">
            <span className="opacity-90 text-white">
              Simplificando o que é um Exoplaneta.
            </span>
          </p>
        </div>

        <div
          className="w-full max-w-2xl flex justify-center"
          onClick={handleOpenModalExplicacaoExoplaneta}
        >
          <UnderstandExoplanet />
        </div>
        <div
          className="w-full max-w-2xl flex justify-center"
          onClick={handleRedirectChatAi}
        >
          <UnderstandExoplanet />
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 w-80 bg-black text-white shadow-lg z-100"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold">Chat com IA</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="text-white hover:bg-gray-800"
                >
                  ✕
                </Button>
              </div>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {/* Placeholder for chat messages */}
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm">Bem-vindo ao chat da IA! Como posso ajudar você?</p>
                  </div>
                  {/* Add more chat messages here */}
                </div>
              </ScrollArea>
              <div className="p-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    className="bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-gray-800"
                  />
                  <Button className="bg-white text-black hover:opacity-95">
                    Enviar
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0  p-16 hover:scale-110" onClick={toggleSidebar}>
        <div className="flex flex-col gap-1">
          <Component />
          <p className="italic text-white">Fale com nossa IA</p>
        </div>
      </div>
    </>
  )
}