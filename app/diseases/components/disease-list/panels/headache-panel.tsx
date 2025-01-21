import Image from "next/image";
import { HeartPulse, Brain, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PanelLayout } from "./common/panel-layout";
import type { Disease } from "../types";

interface HeadachePanelProps {
  disease: Disease;
  onClose: () => void;
}

export function HeadachePanel({ disease, onClose }: HeadachePanelProps) {
  return (
    <PanelLayout title={disease.title} titleEn="HEADACHE" onClose={onClose}>
      {/* 기본 정보 */}
      <div className="space-y-6">
        <div>
          <h3 className="text-3xl font-bold mb-6">두통이란?</h3>
          <p className="text-xl font-medium text-primary mb-4">만성적이고 재발적인 형태로 나타나는 두통</p>
          <p className="text-gray-600 text-lg leading-relaxed">
            두통은 평생 동안 누구나 한 번 이상 겪게 되는 흔한 증상으로 특별한 기질적인 병인 없이 만성적이고 재발적인 형태로 나타나는 두통을 말합니다. 성인 남녀
            대부분이 1년에 한 번 이상 경험할 정도로 흔한 질환입니다.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            워낙 종류가 다양하기 때문에 환자가 호소하는 통증 양상에 근거해 진단할 수 밖에 없습니다. 이러한 두통은 구조적, 영양학적, 심리적, 대사적 차원에서의
            다각적인 도움을 필요로 합니다.
          </p>
        </div>
      </div>

      {/* 두통 환자의 증가 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">두통으로 인한 문제</h3>
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h4 className="text-2xl font-bold text-primary mb-6">두통 환자의 증가</h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                전체 인구 중 90% 이상이 일생에 한 번 이상 겪게 되는 두통. 1년 유병률이 45~70%에 이르는 매우 흔한 신경학적 증상으로 목의 질환이나 전신질환,
                환자의 성격, 환자의 사회경제적 요인 등 여러 요인들에 의해 나타날 수 있습니다.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mt-4">
                현대사회는 생존경쟁의 치열함으로 인해 직장이나 가정 등의 사회환경적 요인에 의해 두통이 점차 증가하고 있으며 진통제의 남용과 오용으로 인한
                일시적인 진통효과로 근원적 치료를 하지 못하는 경우가 많습니다.
              </p>
            </div>
            <div className="relative h-[400px] bg-white rounded-xl overflow-hidden">
              <Image src="/diseases/두통/cause.png" alt="두통의 원인" fill className="object-contain" priority />
            </div>
          </div>
        </div>
      </div>

      {/* 두통 유발요인 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">두통 유발요인</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">신체적 요인</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>과도한 신체 활동</li>
              <li>수면 불량</li>
              <li>경추 자세 불량</li>
              <li>턱관절 문제</li>
              <li>외상 후유증</li>
              <li>여성 호르몬 변화</li>
              <li>감염</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">환경적 요인</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>밝은 빛, 소음</li>
              <li>특정한 냄새</li>
              <li>흡연</li>
              <li>음주</li>
              <li>알러지 유발식품</li>
              <li>민감성 유발 식품</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">정신적 요인</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>우울감</li>
              <li>스트레스</li>
              <li>분노, 화</li>
              <li>상실감</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 두통의 분류 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">두통의 분류</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">편두통</h4>
            <p className="text-gray-600">
              세계 보건 기구의 통계에 의하면 편두통은 모든 질환 중에서 세 번째로 흔하고, 두 번째로 장애가 큰 질환입니다. 여성에서 10~20%, 남성에서 3~7% 정도
              유병률을 보이며 사춘기 이후 여성에서 2~3배 정도 높습니다.
            </p>
            <p className="text-gray-600 mt-4">
              수면 부족, 금식, 혈관확장제, 형광등 불빛, 컴퓨터와 TV, 스마트기기, 특정 음식, 소음 등 많은 요인들이 편두통을 야기하지만 가장 흔한 것은 음식을 통해
              유발되는 염증입니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">군집성 두통</h4>
            <p className="text-gray-600">
              군집성 두통은 죽고 싶은 정도의 극심한 통증(Suicide headache)을 느낍니다. 일반적으로 편두통은 여성이 흔하지만 군집성 두통은 20~50세 사이의
              남성에게서 더 많이 발생합니다.
            </p>
            <p className="text-gray-600 mt-4">
              대부분 같은 쪽에서만 두통이 발생하며, 흡연과 음주는 군집성 두통을 유발시킬 수 있는 생활 습관 요인입니다. 군집성 두통 환자의 약 5%가 유전적인
              경향이 원인이기도 합니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">긴장성 두통</h4>
            <p className="text-gray-600">
              경부나 두피의 지속적인 긴장에 의해 발생합니다. 양측성으로 나타나고 넓은 부위에 걸쳐 묵직한 통증이 지속적으로 있어 마치 머리를 밴드로 조이는 듯한
              통증으로 묘사됩니다.
            </p>
            <p className="text-gray-600 mt-4">안 좋은 자세, 목 척추병, 머리와 목 근육의 긴장, 근육 속 혈관의 수축, 스트레스, 불안, 우울증과 관련돼 있습니다.</p>
          </div>
        </div>
      </div>

      {/* 한의학적 원인 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">두통의 한의학적 원인</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">간양두통(肝陽頭痛)</h4>
            <p className="text-gray-600">
              간의 양기가 치밀어서 생긴 두통을 말합니다. 옆머리와 정수리가 당기는 것 같이 아프면서 어지럽고 번조증이 나며 성격이 조급하고 성을 잘 내며 불면증이
              있고 얼굴이 불그스름하게 달아오르며 입이 마릅니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">담궐두통(痰厥頭痛)</h4>
            <p className="text-gray-600">
              습담으로 청양의 기가 위로 오르지 못해 생긴 두통을 말합니다. 머리가 몹시 아프고 어지러워서 눈을 뜨지 못하며 몸이 무겁고 마음이 불안해 가슴과 명치
              아래가 그득하고 메스껍고 가래가 많습니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">기허두통(氣虛頭痛)</h4>
            <p className="text-gray-600">
              원기가 부족해 생긴 두통을 말합니다. 은은한 두통과 함께 이명이 있고 태양혈 부위가 몹시 아픕니다. 온 몸이 나른하고 식욕이 부진하며 과로하면 두통이
              심해집니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">열궐두통(熱厥頭痛)</h4>
            <p className="text-gray-600">
              열이 위로 치밀어서 생기는 두통을 말합니다. 머리가 아프고 번열이 나서 겨울에도 찬바람을 좋아하고 차게 하면 아픈 것이 잠깐 멎었다가 따뜻한 곳에 가면
              다시 두통이 생기기를 반복합니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">풍한두통(風寒頭痛)</h4>
            <p className="text-gray-600">
              풍한사가 경맥에 침입해 생긴 두통의 하나입니다. 오한이 있으면서 목덜미에서 등까지 당기며 관절이 아프고 코가 막히며 멀건 콧물이 나옵니다. 바람이나
              찬기운을 맞으면 두통이 더 심해집니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">풍열두통(風熱頭痛)</h4>
            <p className="text-gray-600">
              풍열사가 위로 치밀어서 생긴 두통으로 풍한두통에 비해 머리가 더 아픕니다. 때로는 뻐근하면서 박동성을 띠는 수가 있으며 바람을 싫어하고 열이 납니다.
            </p>
          </div>
        </div>
      </div>

      {/* 치료 방법 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">치료 방법</h3>
        <div className="bg-white p-6 rounded-xl">
          <div className="relative h-[500px]">
            <Image src="/diseases/두통/treatment.png" alt="일곡에스한방병원 진료 방법" fill className="object-contain" priority />
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
              한약에서 추출해 정제한 약침 제제를 경혈에 주입해 침과 한약의 효과를 동시에 얻는 소리청 일곡에스한방병원의 두통 치료법입니다. 국소적인 통증 제어 뿐
              아니라 면역력을 높여 탁월한 치료효과를 보입니다.
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
