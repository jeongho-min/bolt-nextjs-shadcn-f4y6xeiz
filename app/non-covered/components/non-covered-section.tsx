import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PriceItem {
  id: string;
  name: string;
  specification?: string | null;
  priceType: "FIXED" | "RANGE" | "TEXT";
  priceMin?: number | null;
  priceMax?: number | null;
  priceText?: string | null;
  order: number;
}

interface PriceCategory {
  id: string;
  name: string;
  parentId: string | null;
  level: number;
  items: PriceItem[];
  children: PriceCategory[];
}

interface NonCoveredSectionProps {
  items: PriceCategory[];
}

function formatPrice(item: PriceItem) {
  switch (item.priceType) {
    case "FIXED":
      return `${item.priceMin?.toLocaleString()}원`;
    case "RANGE":
      return `${item.priceMin?.toLocaleString()}원~${item.priceMax?.toLocaleString()}원`;
    case "TEXT":
      return item.priceText || "-";
    default:
      return "-";
  }
}

export function NonCoveredSection({ items }: NonCoveredSectionProps) {
  const renderCategory = (category: PriceCategory) => {
    return (
      <div key={category.id} className="space-y-4">
        {category.level === 0 ? (
          <>
            <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[25%]">항목</TableHead>
                  <TableHead className="w-[25%]">구분</TableHead>
                  <TableHead className="w-[25%]">규격</TableHead>
                  <TableHead className="w-[25%] text-right">비용</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {category.children?.map((child) => {
                  const items = child.items || [];
                  return items.map((item, index) => (
                    <TableRow key={item.id}>
                      {index === 0 && (
                        <TableCell className="font-medium bg-gray-50" rowSpan={items.length}>
                          {child.name}
                        </TableCell>
                      )}
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.specification || "-"}</TableCell>
                      <TableCell className="text-right">{formatPrice(item)}</TableCell>
                    </TableRow>
                  ));
                })}
              </TableBody>
            </Table>
          </>
        ) : null}

        {/* 하위 카테고리들 재귀적으로 렌더링 */}
        {category.level === 0 && category.children?.length > 0 && <div className="space-y-4">{category.children.map(renderCategory)}</div>}
      </div>
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">{items.map(renderCategory)}</div>
          <p className="text-sm text-gray-500 mt-8">※ 위 금액은 변동될 수 있으며, 실제 진료비는 환자의 상태와 치료 방법에 따라 달라질 수 있습니다.</p>
        </div>
      </div>
    </section>
  );
}
