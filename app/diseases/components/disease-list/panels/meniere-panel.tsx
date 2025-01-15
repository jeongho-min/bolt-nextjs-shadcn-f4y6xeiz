import Image from "next/image";
import { HeartPulse, Brain, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PanelLayout } from "./common/panel-layout";
import type { Disease } from "../types";

interface MenierePanelProps {
  disease: Disease;
  onClose: () => void;
}

export function MenierePanel({ disease, onClose }: MenierePanelProps) {
  return (
    <PanelLayout title={disease.title} titleEn="MENIERE'S DISEASE" onClose={onClose}>
      {/* 기본 정보 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div>
            <h3 className="text-3xl font-bold mb-6">메니에르병이란?</h3>
            <p className="text-xl font-medium text-primary mb-4">현기증과 청력 상실을 유발할 수 있는 내이 장애</p>
            <p className="text-gray-600 text-lg leading-relaxed">
              메니에르는 1861년 프랑스 의사 메니에르가 처음 발견해 '메니에르'란 이름이 붙여진 질환으로 메니에르병 또는 메니에르 증후군으로 불립니다. 병리와 생리
              기전이 완전히 밝혀지지는 않았지만 내림프액의 흡수장애로 내림프 수종이 생겨 발병하기도 하고, 알레르기가 원인이 된다는 보고도 있습니다.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mt-4">
              메니에르는 현기증과 청력 상실을 유발할 수 있는 내이 장애입니다. 내이는 청력과 균형을 담당하는데 메니에르는 현기증, 회전 감각 장애, 이명 및 진행성
              난청을 유발합니다. 대개 한쪽 귀에만 침범하지만 오래 지속되면 다른 귀에까지 나타날 수 있습니다.
            </p>
          </div>
        </div>
        <div className="relative h-[400px] rounded-xl overflow-hidden bg-gray-50">
          <Image src="/diseases/메니에르/main.png" alt="메니에르병의 특징" fill className="object-contain" priority />
        </div>
      </div>

      {/* 발생 원인 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">메니에르병의 원인</h3>
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="text-gray-600 text-lg leading-relaxed">
                메니에르병의 원인은 아직 확실하지 않습니다. 다만 내이의 달팽이관, 세반고리관 내에는 림프액이란 액체로 가득 차 있는데, 이 림프액의 과다생성 혹은
                흡수장애로 인해 압력이 비정상적으로 올라가 생긴다고 알려져 있습니다.
              </p>
            </div>
            <div className="relative h-[400px] bg-white rounded-xl overflow-hidden">
              <Image src="/diseases/메니에르/cause.png" alt="메니에르병의 발생 원인" fill className="object-contain" priority />
            </div>
          </div>
        </div>
      </div>

      {/* 주요 증상 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">메니에르병의 증상</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">01</span>
              </div>
              <h4 className="text-xl font-bold text-primary">청각 증상</h4>
            </div>
            <p className="text-gray-600">귀가 꽉 찬 느낌과 함께 귀가 먹먹하며 잘 들리지 않고 이명 증상이 동반됩니다.</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">02</span>
              </div>
              <h4 className="text-xl font-bold text-primary">갑작스러운 발작</h4>
            </div>
            <p className="text-gray-600">전조증상 없이 갑자기 극심한 어지럼증이 느껴집니다.</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">03</span>
              </div>
              <h4 className="text-xl font-bold text-primary">지속 시간</h4>
            </div>
            <p className="text-gray-600">심한 어지럼증이 갑자기 시작되면 몇 분에서 며칠까지 지속됩니다.</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">04</span>
              </div>
              <h4 className="text-xl font-bold text-primary">동반 증상</h4>
            </div>
            <p className="text-gray-600">편두통이 함께 오는 경우가 많습니다.</p>
          </div>
        </div>
      </div>

      {/* 특징 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">메니에르병의 특징</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">이석증과의 차이</h4>
            <p className="text-gray-600">이석증은 몸의 자세를 바꿀 때 심해지는 반면, 메니에르 발작은 어떤 자세를 취해도 어지럼증이 사라지지 않습니다.</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">복합 증상</h4>
            <p className="text-gray-600">어지럼증과 함께 이명, 난청, 귀가 꽉 차고 먹먹한 느낌이 있습니다.</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">진행성 악화</h4>
            <p className="text-gray-600">발작이 반복됨과 함께 청력과 균형감각을 잃어갑니다.</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">불규칙한 재발</h4>
            <p className="text-gray-600">
              며칠에서 몇 년 동안 어지럼증 발작이 없다가 갑자기 재발하며 한번 발작을 하면 몇 분 간격으로 오기도 하고 몇 달, 몇 년에 한 번씩 심하게 어지럽기도
              하는 등 예측하기가 어렵습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 치료 방법 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">일곡에스한방병원의 치료</h3>
        <div className="bg-white p-6 rounded-xl">
          <h4 className="text-2xl font-bold text-primary mb-6">일곡에스한방병원 진료 방법</h4>
          <div className="relative h-[500px]">
            <Image src="/diseases/메니에르/treatment.png" alt="일곡에스한방병원 진료 방법" fill className="object-contain" priority />
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
