import { Entropy } from "@/components/ui/entropy";

export default function UnderstandExoplanet () {
    return(
            <div className="flex flex-col items-center justify-center  text-white min-h-screen w-full p-8">
              <div className="flex flex-col items-center">
                <Entropy className="rounded-lg" />
                <div className="mt-6 text-center">
                  <div className="space-y-5 font-mono text-[14px] leading-relaxed">
                    <p className="italic text-gray-400/80 tracking-wide">
                      <span className="opacity-90 text-white ">Entenda as principais maneiras utilizadas para reconhecer um Exoplaneta.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
    )
}