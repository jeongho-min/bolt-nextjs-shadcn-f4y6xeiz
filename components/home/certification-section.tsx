"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function CertificationSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden flex items-center w-full">
      <div className="absolute inset-0 z-0 w-full h-full">
        <motion.div initial={{ scale: 1.1 }} whileInView={{ scale: 1 }} transition={{ duration: 1.5 }} className="relative w-full h-full">
          <div className="relative w-full h-full">
            <Image
              src="/section/sec7_bg.jpg"
              alt="배경 이미지"
              fill
              sizes="100vw"
              quality={100}
              loading="eager"
              className="object-cover w-full h-full scale-[1.2] md:scale-100"
              style={{
                objectPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} className="text-white max-w-2xl space-y-6">
            <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <h3 className="text-xs md:text-sm font-medium tracking-[0.2em] mb-4">C E R T I F I C A T I O N & Q U A L I T Y</h3>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                소리청은 검증되고 안전한
                <br />
                의약품만 사용합니다.
              </h2>
            </motion.div>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/90 text-base md:text-lg"
            >
              소리청은 철저한 검사에서 합격된 안전한 의약품만 사용하고 있습니다.
            </motion.p>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-white/80 text-xs md:text-sm leading-relaxed"
            >
              소리청은 청정지역에서 채취한 의약품 하약재를 연구실에서 "잔류농약, 중금속, 곰팡이독소, 이산화항" 등을 보건복지부 및 식약청 고시, 대한약전 및 대한
              약전외 한약규격집에 의거 실험하고, 한약재 수급 및 유통관리 규정에 의거한 한약규격품만을 사용합니다.
            </motion.p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.2 }} className="lg:ml-auto relative hidden lg:block">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-20 top-0 w-60 h-60 bg-primary/20 rounded-full blur-[100px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
