import Image from "next/image";
import { HeartPulse, Brain, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PanelLayout } from "./common/panel-layout";
import type { Disease } from "../types";

interface BPPVPanelProps {
  disease: Disease;
  onClose: () => void;
}

export function BPPVPanel({ disease, onClose }: BPPVPanelProps) {
  return (
    <PanelLayout title={disease.title} titleEn="BENIGN PAROXYSMAL VERTIGO" onClose={onClose}>
      {/* 기본 정보 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div>
            <h3 className="text-3xl font-bold mb-6">이석증이란?</h3>
            <p className="text-xl font-medium text-primary mb-4">예고 없이 갑자기 눈앞이 핑 도는 회전성 어지럼증</p>
            <p className="text-gray-600 text-lg leading-relaxed">
              이석증의 의학명인 양성 발작성 체위성 현훈의 의미를 살펴보면 이석증에 대한 이해가 쉽습니다. '양성', 심각한 질환은 아닙니다. '발작성', 예고 증상이나
              신호 없이 갑자기 시작됩니다. '체위성', 자세 변화, 특히 귀가 있는 머리의 위치 변화로 인해 발생합니다. 마지막으로 '현훈', 눈앞이 실제로 빙글빙글
              도는 회전성 어지럼증이라는 말입니다.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mt-4">
              요약해보면 머리를 움직일 때 예고 없이 갑자기 눈앞이 핑 도는 회전성 어지럼증이 보통 1분 내외로 발생합니다. 다행히 더 심각한 질환으로 진행되지는
              않습니다.
            </p>
          </div>
        </div>
        <div className="relative h-[400px] rounded-xl overflow-hidden bg-gray-50">
          <Image src="/diseases/이석증/main.png" alt="이석증의 특징" fill className="object-contain" priority />
        </div>
      </div>

      {/* 발생 원인 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">이석증 발생 원인</h3>
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h4 className="text-2xl font-bold text-primary mb-6">어지럼증의 대표질환, 이석증</h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                전정기관 내의 이석은 머리나 몸이 수직, 수평 방향으로 기울어질 때 함께 기울어져 위치 감각을 느끼게 하여 우리 몸의 균형을 잡아주는 역할을 합니다.
                그런데 이 이석이 떨어져 나와 반고리관 내로 이동하게 되면 이석증이 발생합니다.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mt-4">
                이석증은 회전성 어지럼증을 일으키는 질환 중 가장 흔하며, 평생 한 번이라도 앓게 될 가능성은 2.4~10%로 상당히 높은 편입니다.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mt-4">
                간혹 머리를 세게 부딪치거나 교통사고 등을 겪은 아이에게서 발생하는 경우도 있지만 이석증이 발병 원인은 명확하게 밝혀지지 않았습니다. 이석의
                주성분이 칼슘이기 때문에 혈중 칼슘 농도, 골다공증, 칼슘 대사를 조절하는 비타민 D의 농도와 연관성을 밝히려는 연구가 많이 진행되고 있습니다.
              </p>
            </div>
            <div className="relative h-[500px] bg-white rounded-xl overflow-hidden">
              <Image src="/diseases/이석증/cause.png" alt="이석증의 발생 원인" fill className="object-contain" priority />
            </div>
          </div>
        </div>
      </div>

      {/* 주요 증상 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">이석증 증상</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">01</span>
              </div>
              <h4 className="text-xl font-bold text-primary">특정 자세에서 발생</h4>
            </div>
            <p className="text-gray-600">
              이석이 세반고리관을 자극하게 하는 움직임이 있을 때 어지럼증이 나타납니다. 고개를 돌리거나 누웠다 일어날 때, 혹은 고개를 숙일 때 수 초에서 일 분
              정도 주변이 돌아가는 듯한 어지럼증을 느낍니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">02</span>
              </div>
              <h4 className="text-xl font-bold text-primary">정지 시 증상 완화</h4>
            </div>
            <p className="text-gray-600">
              머리를 움직이지 않고 가만히 있으면 증상이 사라집니다. 특정 움직임이나 동작을 할 때 심하게 어지럽고 구토 증상이 나며 눈 앞이 빙글빙글 도는 느낌이
              납니다. 걷기가 힘들고 눈이 침침해지며 식은땀이 나고 숨이 막히기도 합니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">03</span>
              </div>
              <h4 className="text-xl font-bold text-primary">자세 선호도</h4>
            </div>
            <p className="text-gray-600">누워서 이석이 있는 방향으로 머리를 돌리면 특별히 더 어지럽기 때문에 반대방향으로 눕는 경향을 보입니다.</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">04</span>
              </div>
              <h4 className="text-xl font-bold text-primary">일시적 회복</h4>
            </div>
            <p className="text-gray-600">
              일정시간 안정을 취하고 나면 어지럼증이 가라앉습니다. 심하게 어지럽고 토하면서 힘들기 때문에 불안해진 환자들은 응급실을 찾아가지만 대부분 특별한
              이상을 발견하진 못합니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">05</span>
              </div>
              <h4 className="text-xl font-bold text-primary">재발 가능성</h4>
            </div>
            <p className="text-gray-600">
              이석증은 제대로 치료를 하지 않으면 재발이 잦은 편입니다. 그래서 몇 번 겪어본 환자들은 병원을 찾지 않고 스스로 자가 치료하는 경우도 있습니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">06</span>
              </div>
              <h4 className="text-xl font-bold text-primary">주요 원인</h4>
            </div>
            <p className="text-gray-600">외상, 만성피로/과로, 면역력 저하, 스트레스, 갱년기, 임신 중 호르몬의 변화, 노화가 주된 원인입니다.</p>
          </div>
        </div>
      </div>

      {/* 치료 방법 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">치료 방법</h3>
        <div className="bg-white p-6 rounded-xl">
          <div className="relative h-[500px]">
            <Image src="/diseases/이석증/treatment.png" alt="일곡에스한방병원 진료 방법" fill className="object-contain" priority />
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
              한약에서 추출해 정제한 약침 제제를 경혈에 주입해 침과 한약의 효과를 동시에 얻는 소리청일곡에스한방병원의 이석증 치료법입니다. 국소적인 통증 제어
              뿐 아니라 면역력을 높여 탁월한 치료효과를 보입니다.
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
