import Image from "next/image";
import { HeartPulse, Brain, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PanelLayout } from "./common/panel-layout";
import type { Disease } from "../types";

interface SuddenHearingLossPanelProps {
  disease: Disease;
  onClose: () => void;
}

export function SuddenHearingLossPanel({ disease, onClose }: SuddenHearingLossPanelProps) {
  return (
    <PanelLayout title={disease.title} titleEn="SUDDEN DEAFNESS" onClose={onClose}>
      {/* 기본 정보 */}
      <div className="space-y-6">
        <div>
          <h3 className="text-3xl font-bold mb-6">돌발성난청이란?</h3>
          <p className="text-xl font-medium text-primary mb-4">뚜렷한 원인 없이 귀가 잘 들리지 않게 되는 감각신경성 난청</p>
          <p className="text-gray-600 text-lg leading-relaxed">
            돌발성 난청은 뚜렷한 원인 없이 귀가 잘 들리지 않게 되는 감각신경성 난청입니다. 대부분 한쪽 귀에 발생하고 30~50대에 가장 많이 발생하며, 해마다 10만명
            이상 발병하는 것으로 보고되고 있습니다.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            돌발성 난청은 안타깝게도 치료 시기를 놓치면 영원히 회복되지 않는 난청이 될 수도 있기 때문에 여러 가지 귀 질환 중 응급질환 중 하나입니다.
          </p>
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
                  청력저하
                </Badge>
                <Badge variant="outline" className="text-base px-6 py-2.5 border-2 hover:bg-primary/5 transition-colors">
                  이명
                </Badge>
                <Badge variant="outline" className="text-base px-6 py-2.5 border-2 hover:bg-primary/5 transition-colors">
                  귀먹먹함
                </Badge>
                <Badge variant="outline" className="text-base px-6 py-2.5 border-2 hover:bg-primary/5 transition-colors">
                  어지럼증
                </Badge>
              </div>
              <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                돌발성 난청은 <span className="font-bold text-primary">특별한 원인 없이 갑자기 발생</span>하는데,
                <span className="font-bold text-primary">신체적·정신적 상황</span>이 복합적으로 겹쳐 나타나는 경우가 많습니다.
              </p>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                갑자기 귀가 먹먹해지면서 들리지 않거나 귀 울림이 나타나기도 하고, 현기증과 구토가 동반되거나 어지럼증이 반복적으로 있다면 돌발성 난청을 의심해
                봐야 합니다.
              </p>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">
                대인관계 및 사회생활의 어려움과 언어장애, 정신적 장애가 동반될 수 있으므로 위험합니다.
              </p>
            </div>
            <div className="relative h-[500px] bg-white rounded-xl overflow-hidden">
              <Image src="/diseases/돌발성난청/symptoms.png" alt="돌발성난청의 주요 증상" fill className="object-contain" priority />
            </div>
          </div>
        </div>
      </div>

      {/* 한의학적 원인 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">돌발성 난청의 한의학적 원인</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">풍열(風熱) 난청</h4>
            <p className="text-gray-600">
              귀에 질환이 생겨서 앓고 난 후 생기는 돌발성 난청입니다. 몸에 풍열의 기운이 있으면 눈 충혈이 잘 되거나 심한 두통이 발생하기도 합니다. 귀가 가려운
              증상이 함께 나타날 수 있습니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">기허(氣虛) 난청</h4>
            <p className="text-gray-600">정신적 긴장감과 만성피로가 과하고 매사에 의욕이 없으며 혈압이 낮은 사람에게서 많이 발생하는 난청입니다.</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">신허(腎虛) 난청</h4>
            <p className="text-gray-600">출산 후, 혹은 과한 성생활 등으로 인해 신장 기능이 약화돼 나타나는 난청입니다.</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">담화(談話) 난청</h4>
            <p className="text-gray-600">술과 기름기 있는 음식을 즐겨 먹는 경우 담음 노폐물이 쌓이고 담화가 축적되어 생기는 난청입니다.</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">간화(肝火) 난청</h4>
            <p className="text-gray-600">신경이 예민하거나 신경을 많이 쓰며 스트레스가 쌓이거나 충격을 받아서 발생하는 난청입니다.</p>
          </div>
          <div className="bg-white p-6 rounded-xl">
            <h4 className="text-xl font-bold text-primary mb-4">기타</h4>
            <p className="text-gray-600">그밖에 약물의 남용이나 잘못된 투약, 외상 등으로 인하여 난청이 발병할 수 있습니다.</p>
          </div>
        </div>
      </div>

      {/* 치료 시기 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">치료 시기</h3>
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h4 className="text-2xl font-bold text-primary mb-6">발병 후 3개월 이내 적절한 치료가 이루어지는 것이 중요합니다!</h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                돌발성 난청 환자 약 60% 정도에서 난청이 회복되는데 대부분의 경우 2주 내에 가장 많이 회복되고 이후에도 1~3개월에 걸쳐 회복됩니다.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mt-4">
                2주 내에 회복되지 않으면 오래 동안 지속되거나, 완전히 회복되지 않는 경우가 많습니다. 즉, 발병 후 3개월 내에 적절한 치료가 이루어지는 것이 가장
                중요합니다. 당연히 치료가 빠르면 빠를수록 좋은 치료 효과를 기대할 수 있습니다.
              </p>
            </div>
            <div className="relative h-[300px] bg-white rounded-xl overflow-hidden">
              <Image src="/diseases/돌발성난청/treatment-timing.png" alt="돌발성난청의 치료 시기" fill className="object-contain" priority />
            </div>
          </div>
        </div>
      </div>

      {/* 치료 방법 */}
      <div className="bg-gray-50 p-8 rounded-2xl">
        <h3 className="text-3xl font-bold mb-8">치료 방법</h3>
        <div className="bg-white p-6 rounded-xl">
          <div className="relative h-[500px]">
            <Image src="/diseases/돌발성난청/treatment.png" alt="일곡에스한방병원 진료 방법" fill className="object-contain" priority />
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
              한약에서 추출해 정제한 약침 제제를 경혈에 주입해 침과 한약의 효과를 동시에 얻는 소리청 일곡에스한방병원의 돌발성난청 치료법입니다. 국소적인 통증
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
