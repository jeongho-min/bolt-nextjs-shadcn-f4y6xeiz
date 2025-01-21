import Image from "next/image";
import type { Disease } from "../types";
import { PanelLayout } from "./common/panel-layout";

interface VestibularNeuritisPanelProps {
  disease: Disease;
  onClose: () => void;
}

export function VestibularNeuritisPanel({ disease, onClose }: VestibularNeuritisPanelProps) {
  return (
    <PanelLayout title={disease.title} titleEn="VESTIBULAR NEURONITIS" onClose={onClose}>
      {/* 기본 정보 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div>
            <h3 className="text-3xl font-bold mb-6">전정신경염이란?</h3>
            <p className="text-xl font-medium text-primary mb-4">전정신경에 염증이 발생해 겪는 어지럼증</p>
            <p className="text-gray-600 text-lg leading-relaxed">
              사람의 귀 깊은 곳에는 몸의 자세를 느끼도록 해 균형을 잡을 수 있게 도와주는 평형 기관이 있습니다. 이 평형 기관에는 전정과 반고리관이 있습니다. 이
              구조물로부터 감각을 받아들이는 신경을 전정신경이라고 합니다.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mt-4">
              전정신경염은 어떤 원인에 의해 전정신경에 염증이 발생해 심한 어지러움과 메스꺼움을 느끼고 균형잡기가 힘들어지는 질환입니다. 전정신경에 생긴 염증
              때문에 전정말단에서 기시되는 구심성 신호가 갑자기 절단이 돼 어지럼증을 경험하게 되는 것입니다.
            </p>
          </div>
        </div>
        <div className="relative h-[400px] rounded-xl overflow-hidden bg-gray-50">
          <Image src="/diseases/전정신경염/main.png" alt="전정신경염의 특징" fill className="object-contain" priority />
        </div>
      </div>

      {/* 발생 이후 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">전정신경염 발생 이후</h3>
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="text-gray-600 text-lg leading-relaxed">
                증상이 일반적으로 몇 시간에 걸쳐 발생하고 첫 1~2일 이내에 가장 심각합니다. 머리를 움직이면 더 악화될 수 있습니다. 증상은 별다른 치료 없이 수일
                내에 사라지기도 하지만 증상이 완전히 사라지기까지 몇 주 또는 몇 달이 걸릴 수도 있습니다.
              </p>
            </div>
            <div className="relative h-[400px] bg-white rounded-xl overflow-hidden">
              <Image src="/diseases/전정신경염/progress.png" alt="전정신경염의 진행 과정" fill className="object-contain" priority />
            </div>
          </div>
        </div>
      </div>

      {/* 주요 증상 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">전정신경염의 증상</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">01</span>
              </div>
              <h4 className="text-xl font-bold text-primary">지속적인 어지럼증</h4>
            </div>
            <p className="text-gray-600">심한 어지럼증이 하루 이상 지속되며 구토와 함께 식은땀을 흘립니다.</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">02</span>
              </div>
              <h4 className="text-xl font-bold text-primary">자세 불안정</h4>
            </div>
            <p className="text-gray-600">앉거나 일어설 때 몸이 한쪽으로 기울어지거나 넘어집니다.</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">03</span>
              </div>
              <h4 className="text-xl font-bold text-primary">시각 증상</h4>
            </div>
            <p className="text-gray-600">눈 떨림과 시력이 떨어진 느낌이 있고 눈이 침침합니다.</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">04</span>
              </div>
              <h4 className="text-xl font-bold text-primary">보행 장애</h4>
            </div>
            <p className="text-gray-600">걷는 동작이 불안정하며 비틀댑니다.</p>
          </div>
        </div>
      </div>

      {/* 특징 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">전정신경염의 특징</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">발병 원인</h4>
            <p className="text-gray-600">
              전정신경염은 감기나 독감을 심하게 앓은 후 생기는 경우도 많기 때문에 바이러스 감염을 원인으로 추정하기도 합니다. 기능저하의 경우 전정신경에 혈액을
              공급해주는 혈관이 막혀서 생기는 것으로 보기도 합니다. 만성적인 면역력 저하, 과로, 불면, 스트레스 등도 원인으로 꼽힙니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">방향성 어지럼증</h4>
            <p className="text-gray-600">
              전정신경의 기능적 불균형으로 인해서 어느 한쪽으로 움직일 때 더욱 어지럽습니다. 고개를 좌우로 빨리 돌리게 해 검사할 때 눈동자가 어느 한 방향에서
              많이 떨리는 것을 확인할 수 있습니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">신체적 특징</h4>
            <p className="text-gray-600">허리 이하 하체에 힘이 없고 목덜미가 뻣뻣하고 뭉쳐있다고 합니다.</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">청각 증상 없음</h4>
            <p className="text-gray-600">이명이나 청력의 손상은 동반하지 않습니다.</p>
          </div>
        </div>
      </div>

      {/* 치료 방법 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">치료 방법</h3>
        <div className="bg-white p-6 rounded-xl">
          <div className="relative h-[500px]">
            <Image src="/diseases/전정신경염/treatment.png" alt="일곡에스한방병원 진료 방법" fill className="object-contain" priority />
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
              한약에서 추출해 정제한 약침 제제를 경혈에 주입해 침과 한약의 효과를 동시에 얻는 소리청 일곡에스한방병원의 전정신경염 치료법입니다. 국소적인 통증
              제어 뿐 아니라 면역력을 높여 탁월한 치료효과를 보입니다.
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
