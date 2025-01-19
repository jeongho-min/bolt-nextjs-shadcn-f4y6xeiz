import { PageLayout } from "@/app/admin/components/page-layout";
import { CategoryForm } from "@/app/admin/prices/components/category-form";
import { headers } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface Props {
  params: {
    id: string;
  };
}

async function getCategoryData(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const headersList = headers();
    const protocol = headersList.get("x-forwarded-proto") || "http";
    const host = headersList.get("host");
    const apiUrl = `${protocol}://${host}/api/admin/prices/categories/${id}`;

    const response = await fetch(apiUrl, {
      cache: "no-store",
      credentials: "include",
      headers: {
        Cookie: headersList.get("cookie") || "",
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Not found");
      }
      throw new Error("카테고리 정보를 불러오는데 실패했습니다.");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
}

export default async function EditCategoryPage({ params }: Props) {
  const categoryData = await getCategoryData(params.id);

  return (
    <PageLayout title="카테고리 수정" backUrl="/admin/prices">
      <CategoryForm
        initialData={{
          id: categoryData.id,
          name: categoryData.name,
          order: categoryData.order,
          parentId: categoryData.parentId || "",
        }}
      />
    </PageLayout>
  );
}
