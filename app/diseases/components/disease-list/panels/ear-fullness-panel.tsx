import Image from "next/image";
import { HeartPulse, Brain, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PanelLayout } from "./common/panel-layout";
import type { Disease } from "../types";

interface EarFullnessPanelProps {
  disease: Disease;
  onClose: () => void;
}

export function EarFullnessPanel({ disease, onClose }: EarFullnessPanelProps) {
  return (
    <PanelLayout title={disease.title} titleEn="EAR FULLNESS" onClose={onClose}>
      {/* 기본 정보 */}
      <div className="space-y-6">
        <div>
          <h3 className="text-3xl font-bold mb-6">귀먹먹함이란?</h3>
          <p className="text-xl font-medium text-primary mb-4">귓속에 무언가 가득 차 있는 듯한 '귀 먹먹함'</p>
          <p className="text-gray-600 text-lg leading-relaxed">
            귓속에 무언가 가득 차 있는 듯한 '귀 먹먹함'은 이충만감이라고 합니다. 외이도염, 중이염, 저음역 감각신경성 난청 등 다양한 원인이 있으나, 대부분은
            이관기능장애로 인해 발생합니다.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            이관(유스타키오관)을 통해 고막 안과 밖의 압력차를 조절하는데, 이 기능에 문제가 생기면 소리울림, 이명, 귀먹먹함 등이 발생할 수 있습니다.
          </p>
        </div>
      </div>

      {/* 이관의 역할 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">귀먹먹함의 원인</h3>
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="text-gray-600 text-lg leading-relaxed">
                외이도염이나 중이염과 같이 염증으로 인해 이충만감을 느낄 수 있고 저음역 감각신경성 난청이 발생해도 비슷한 증상을 느낄 수 있습니다. 하지만
                대부분의 '귀 먹먹함'은 이관기능장애 때문에 발생합니다. 이관은 코 뒤편과 귀를 연결하는 부위로 유스타키오관이라고도 부르며 고막 안쪽 공간인 중이와
                고막 바깥쪽의 압력 차이를 조절합니다. 또 중이 내의 정화, 보호, 환기 등에 관여하는 기관입니다.
              </p>
            </div>
            <div className="relative h-[400px] bg-white rounded-xl overflow-hidden">
              <Image src="/diseases/귀먹먹함/cause.png" alt="귀먹먹함의 원인" fill className="object-contain" priority />
            </div>
          </div>
        </div>
      </div>

      {/* 이관 기능장애 유형 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">이관 기능장애 유형</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">이관개방증</h4>
            <p className="text-gray-600 mb-4">
              정상적인 이관은 안정된 상태에서 닫혀 있다가 침을 삼키거나 하품을 하는 동작 등을 통해 열리게 되어있습니다. 하지만 이관의 연골부가 평상시에도
              비정상적으로 계속 열려 있는 상태를 이관 개방증이라고 합니다.
            </p>
            <p className="text-gray-600 font-medium mt-4">주요 원인:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>근육의 이상</li>
              <li>급격한 체중 감소</li>
              <li>출산</li>
              <li>방사선 치료</li>
              <li>이관의 비정상적 구조</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">이관폐색증/이관협착증</h4>
            <p className="text-gray-600 mb-4">
              정상인들은 이관의 기능이 아무런 문제가 없기 때문에 괜찮지만 이관 폐색증은 말 그대로 개폐가 자유롭게 되어 압력조절이 되어야 하는데도 불구하고
              이관이 닫혀 귀가 먹먹해지고 소리도 잘 들리지 않는 등의 증상이 나타남을 의미합니다.
            </p>
            <p className="text-gray-600 font-medium mt-4">주요 원인:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>알레르기 비염</li>
              <li>만성 축농증</li>
              <li>흡연</li>
              <li>코 뒤편의 종양</li>
              <li>구개열</li>
              <li>상기도 바이러스 감염</li>
              <li>이관 입구를 막고 있는 아데노이드</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 주요 증상 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">귀먹먹함의 증상</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">01</span>
              </div>
              <h4 className="text-xl font-bold text-primary">귀가 먹먹한 느낌</h4>
            </div>
            <p className="text-gray-600">말할 때, 숨쉴 때, 음식 먹을 때, 걸을 때, 운동 할 때 귀에 압이 차 먹먹한 느낌</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">02</span>
              </div>
              <h4 className="text-xl font-bold text-primary">이명</h4>
            </div>
            <p className="text-gray-600">귀울림</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">03</span>
              </div>
              <h4 className="text-xl font-bold text-primary">소리 울림</h4>
            </div>
            <p className="text-gray-600">본인 목소리, 숨소리가 울려서 들리는 느낌</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">04</span>
              </div>
              <h4 className="text-xl font-bold text-primary">현실감 저하</h4>
            </div>
            <p className="text-gray-600">머리가 붕 뜬 느낌 (현실 감각 저하)</p>
          </div>
        </div>
      </div>

      {/* 치료 방법 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">일곡에스한방병원의 치료</h3>
        <div className="bg-white p-6 rounded-xl">
          <h4 className="text-2xl font-bold text-primary mb-6">일곡에스한방병원 진료 방법</h4>
          <div className="relative h-[500px]">
            <Image src="/diseases/귀먹먹함/treatment.png" alt="일곡에스한방병원 진료 방법" fill className="object-contain" priority />
          </div>
        </div>

        {/* 치료 방법 설명 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h4 className="text-xl font-bold text-primary">한약 치료</h4>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              한약치료를 통해 신체 오장육부의 기능을 촉진시켜 청력세포를 생성합니다. 생성된 청력세포는 약해진 기혈흐름을 바로잡습니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h4 className="text-xl font-bold text-primary">침 치료</h4>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              침 치료를 통해 귀나 눈 질환의 80% 이상의 자각증상 호전 및 소실을 도우며 약 12주의 기간이 필요합니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h4 className="text-xl font-bold text-primary">약침 치료</h4>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              한약에서 추출해 정제한 약침 제제를 경혈에 주입해 침과 한약의 효과를 동시에 얻는 일곡에스한방병원의 이명 치료법입니다. 국소적인 통증 제어 뿐 아니라
              면역력을 높여 탁월한 치료효과를 보입니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">4</span>
              </div>
              <h4 className="text-xl font-bold text-primary">추나 치료</h4>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              자세가 바르지 않고 척추에 문제가 있거나 턱관절에 문제가 있으면 신경이 과잉 흥분되어 청력이 떨어지고 귀질환이 오기 쉽습니다. 통합 교정 치료를 통해
              구조적인 문제를 해결하며 귀 질환을 예방합니다.
            </p>
          </div>
        </div>
      </div>
    </PanelLayout>
  );
}
