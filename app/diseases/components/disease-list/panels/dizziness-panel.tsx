import Image from "next/image";
import { HeartPulse, Brain, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PanelLayout } from "./common/panel-layout";
import type { Disease } from "../types";

interface DizzinessPanelProps {
  disease: Disease;
  onClose: () => void;
}

export function DizzinessPanel({ disease, onClose }: DizzinessPanelProps) {
  return (
    <PanelLayout title={disease.title} titleEn="DIZZINESS" onClose={onClose}>
      {/* 기본 정보 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div>
            <h3 className="text-3xl font-bold mb-6">어지럼증이란?</h3>
            <p className="text-xl font-medium text-primary mb-4">어질한 불균형감, 자신이나 주위가 빙빙 도는 느낌</p>
            <p className="text-gray-600 text-lg leading-relaxed">
              어지럼증이란 어질한 불균형감(眩, dizziness)이나, 자신이나 주위가 빙빙 도는 느낌(暈, vertigo)을 의미합니다. 어지럼증을 경험해 보지 않은 사람은 거의
              없을 정도로 '어지럼증'은 아주 흔하게 생길 수 있는 증상입니다.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mt-4">
              어지럼증은 뇌(특히 소뇌, 뇌간), 귀(엄밀히 말하면 귓속의 전정기관), 눈, 말초신경(특히 고유감각 담당), 자율신경 등 여러 기관의 이상에 의해 초래될 수
              있습니다. 그러므로 어지럼증의 양상이 빙글빙글 돌아가는 '현훈성'인지, '비현훈성'인지, 어지럼증이 발생하는 상황, 혹은 동반되는 다른 신체 증상 등을
              모두 고려해 정확하게 원인을 판단하는 것이 중요합니다.
            </p>
          </div>
        </div>
        <div className="relative h-[400px] rounded-xl overflow-hidden bg-gray-50">
          <Image src="/diseases/어지럼증/main.png" alt="어지럼증의 특징" fill className="object-contain" priority />
        </div>
      </div>

      {/* 주요 증상 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">주요 증상</h3>
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <HeartPulse className="w-7 h-7 text-primary" />
                </div>
                <h4 className="text-2xl font-bold text-primary">주요 증상</h4>
              </div>
              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="text-base px-6 py-2.5 border-2 hover:bg-primary/5 transition-colors">
                  중심을 못 잡는 느낌
                </Badge>
                <Badge variant="outline" className="text-base px-6 py-2.5 border-2 hover:bg-primary/5 transition-colors">
                  머리 속에서 물에 떠 있는 느낌
                </Badge>
                <Badge variant="outline" className="text-base px-6 py-2.5 border-2 hover:bg-primary/5 transition-colors">
                  수영하는 느낌
                </Badge>
                <Badge variant="outline" className="text-base px-6 py-2.5 border-2 hover:bg-primary/5 transition-colors">
                  빙빙도는 느낌
                </Badge>
                <Badge variant="outline" className="text-base px-6 py-2.5 border-2 hover:bg-primary/5 transition-colors">
                  머리가 멍한 느낌
                </Badge>
                <Badge variant="outline" className="text-base px-6 py-2.5 border-2 hover:bg-primary/5 transition-colors">
                  멀미
                </Badge>
                <Badge variant="outline" className="text-base px-6 py-2.5 border-2 hover:bg-primary/5 transition-colors">
                  오심과 구토
                </Badge>
                <Badge variant="outline" className="text-base px-6 py-2.5 border-2 hover:bg-primary/5 transition-colors">
                  복시
                </Badge>
                <Badge variant="outline" className="text-base px-6 py-2.5 border-2 hover:bg-primary/5 transition-colors">
                  동요시
                </Badge>
              </div>
            </div>
            <div className="relative h-[500px] bg-white rounded-xl overflow-hidden">
              <Image src="/diseases/어지럼증/symptoms.png" alt="어지럼증의 주요 증상" fill className="object-contain" priority />
            </div>
          </div>
        </div>
      </div>

      {/* 연령별 특징 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">연령별 특징</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">노인성 어지럼증</h4>
            <p className="text-gray-600 mb-4">65세 이상 노인의 30%가 겪고 있는 노인성 어지럼증의 주요 원인:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>균형감각을 유지하는데 필요한 기관들의 퇴행</li>
              <li>소뇌와 평형기관의 신경세포들의 기능 퇴화</li>
              <li>두통</li>
              <li>긴장</li>
              <li>만성질환</li>
              <li>시력장애</li>
              <li>생리적 현상</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">어린이/청소년 어지럼증</h4>
            <p className="text-gray-600 mb-4">7세~15세는 감각통합 능력이 형성되는 시기입니다.</p>
            <p className="text-gray-600 mb-4">
              성장기는 충분한 신체자극과 풍부한 사각자극을 통해 감각통합능력이 형성되는 시기입니다. 하지만 요즘 어린이나 청소년들은 운동시간이 충분치 못한
              경우가 많아 균형감각능력이 떨어져 어지럼증을 유발할 수 있습니다.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>두통</li>
              <li>눈떨림</li>
              <li>학습장애</li>
              <li>긴장</li>
              <li>불안</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 한의학적 원인 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">어지럼증의 한의학적 원인</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">풍훈(風暈)</h4>
            <p className="text-gray-600">
              어지럼증을 느끼면서 땀이 많고 추위를 느끼는 증세가 함께 나타납니다. 뇌혈관 질환이나 안면마비, 고혈압과 같은 풍병이라고 부르는 질환을 앓던 사람이
              이런 증세가 나타나면 시급히 진료를 받아야 합니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">열훈(熱暈)</h4>
            <p className="text-gray-600">더운 곳에 오래 있으면 열이 오르고 갈증이 나서 물을 자주 마시고 열이 심해 어지럼증을 일으키는 것입니다.</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">허훈(虛暈)</h4>
            <p className="text-gray-600">기운이나 피를 너무 많이 소모했거나 병을 오래 앓아서 체력이 허약해져 발생하는 어지러움입니다.</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">습훈(濕暈)</h4>
            <p className="text-gray-600">비를 맞고 습기에 상해 발생한 어지럼증입니다. 주로 코가 막히고 목소리가 무겁고 탁해지면서 어지러운 특징이 있습니다.</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">기훈(氣暈)</h4>
            <p className="text-gray-600">정신적인 과로나 충격, 스트레스로 인해 발생되는 어지러움입니다.</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">담훈(痰暈)</h4>
            <p className="text-gray-600">체내의 수분대사의 이상으로 습담의 나쁜 기운이 많아져 발생하는 어지러움입니다.</p>
          </div>
        </div>
      </div>

      {/* 치료 방법 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">치료 방법</h3>
        <div className="bg-white p-6 rounded-xl">
          <div className="relative h-[500px]">
            <Image src="/diseases/어지럼증/treatment.png" alt="일곡에스한방병원 진료 방법" fill className="object-contain" priority />
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
              한약에서 추출해 정제한 약침 제제를 경혈에 주입해 침과 한약의 효과를 동시에 얻는 소리청 일곡에스한방병원의 어지럼증 치료법입니다. 국소적인 통증
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
