import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function NonCoveredSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {/* 한약/처방 테이블 */}
            <div>
              <h3 className="text-xl font-semibold mb-4">한약/처방</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[25%]">항목</TableHead>
                    <TableHead className="w-[35%]">구분</TableHead>
                    <TableHead className="w-[20%]">용량</TableHead>
                    <TableHead className="w-[25%] text-right">비용</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* 탕약 */}
                  <TableRow>
                    <TableCell rowSpan={3} className="align-top font-medium bg-gray-50">
                      탕약
                    </TableCell>
                    <TableCell>일반 탕약</TableCell>
                    <TableCell>15일분</TableCell>
                    <TableCell className="text-right">250,000원~600,000원</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>수험생 총명탕</TableCell>
                    <TableCell>15일분</TableCell>
                    <TableCell className="text-right">300,000원</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>현훈단</TableCell>
                    <TableCell>15일분</TableCell>
                    <TableCell className="text-right">225,000원</TableCell>
                  </TableRow>
                  {/* 환약 */}
                  <TableRow>
                    <TableCell rowSpan={6} className="align-top font-medium bg-gray-50">
                      환약
                    </TableCell>
                    <TableCell>공진단</TableCell>
                    <TableCell>10환</TableCell>
                    <TableCell className="text-right">500,000원</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>공진단</TableCell>
                    <TableCell>30환</TableCell>
                    <TableCell className="text-right">1,400,000원</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>이명환</TableCell>
                    <TableCell>15일분</TableCell>
                    <TableCell className="text-right">150,000원</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>슬림환</TableCell>
                    <TableCell>30일분</TableCell>
                    <TableCell className="text-right">250,000원</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>슬림환</TableCell>
                    <TableCell>90일분 (+ 30일분)</TableCell>
                    <TableCell className="text-right">750,000원</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>경옥고</TableCell>
                    <TableCell>30일분</TableCell>
                    <TableCell className="text-right">300,000원</TableCell>
                  </TableRow>
                  {/* 기타 */}
                  <TableRow>
                    <TableCell className="font-medium bg-gray-50">기타</TableCell>
                    <TableCell>파스</TableCell>
                    <TableCell>1매</TableCell>
                    <TableCell className="text-right">3,000원~10,000원</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* 치료/처치 테이블 */}
            <div>
              <h3 className="text-xl font-semibold mb-4">치료/처치</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[20%]">항목</TableHead>
                    <TableHead className="w-[35%]">구분</TableHead>
                    <TableHead className="w-[25%] text-right">비용</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>도수치료</TableCell>
                    <TableCell>비급여</TableCell>
                    <TableCell className="text-right">50,000원~150,000원</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell rowSpan={3}>추나요법</TableCell>
                    <TableCell>단순추나 (급여)</TableCell>
                    <TableCell className="text-right">본인부담 30%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>복잡추나 (급여)</TableCell>
                    <TableCell className="text-right">본인부담 30%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>특수추나 (급여)</TableCell>
                    <TableCell className="text-right">본인부담 30%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* 제증명 수수료 테이블 */}
            <div>
              <h3 className="text-xl font-semibold mb-4">제증명 수수료</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[75%]">구분</TableHead>
                    <TableHead className="w-[25%] text-right">비용</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>일반진단서</TableCell>
                    <TableCell className="text-right">20,000원</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>상해진단서</TableCell>
                    <TableCell className="text-right">100,000원</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <p className="text-sm text-gray-500 mt-4">※ 위 금액은 변동될 수 있으며, 실제 진료비는 환자의 상태와 치료 방법에 따라 달라질 수 있습니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
