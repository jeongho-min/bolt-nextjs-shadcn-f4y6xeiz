"use client";

import { Building2, MapPin, Phone } from "lucide-react";
import { useFooter } from "@/app/providers/footer-provider";
import { useHospital } from "@/app/providers/hospital-provider";

export function Footer() {
  const { isFooterVisible } = useFooter();
  const { hospitalInfo, isLoading } = useHospital();
  const currentYear = new Date().getFullYear();

  if (!isFooterVisible || isLoading || !hospitalInfo) return null;

  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">진료시간</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                평일: {hospitalInfo.weekdayOpen} - {hospitalInfo.weekdayClose}
              </p>
              {hospitalInfo.saturdayOpen && hospitalInfo.saturdayClose && (
                <p>
                  토요일: {hospitalInfo.saturdayOpen} - {hospitalInfo.saturdayClose}
                </p>
              )}
              <p>
                점심시간: {hospitalInfo.lunchStart} - {hospitalInfo.lunchEnd}
              </p>
              <p className="text-primary text-red-600">{hospitalInfo.closedDays} 휴진</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">연락처</h3>
            <div className="space-y-2 text-sm text-gray-600">
              {hospitalInfo.specialtyPhone && (
                <p className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {hospitalInfo.specialtyPhone.split(" (")[0]}
                  <span className="ml-2 text-primary">({hospitalInfo.specialtyPhone.split(" (")[1]?.replace(")", "")})</span>
                </p>
              )}
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                {hospitalInfo.mainPhone}
              </p>
              <p className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {hospitalInfo.address}
              </p>
              {hospitalInfo.addressDetail && <p className="ml-6">{hospitalInfo.addressDetail}</p>}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">진료과목</h3>
            <div className="text-sm text-gray-600">
              <div className="flex gap-8">
                <div>
                  <span className="font-medium text-primary">한방</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="space-x-2">
                    <span>이비인후과</span>&nbsp; ·<span>내과</span>&nbsp; ·<span>침구과</span>&nbsp; ·<span>재활의학과</span>&nbsp; ·<span>사상체질과</span>
                    &nbsp; ·<span>정신신경과</span>&nbsp; ·<span>부인과</span>&nbsp; ·<span>소아과</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-8 mt-2">
                <div>
                  <span className="font-medium text-primary">양방</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="space-x-2">
                    <span>가정의학과</span>&nbsp; ·<span>내과</span>&nbsp; ·<span>영상의학과</span>&nbsp; ·<span>재활의학과</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500 space-y-2">
            <p className="flex items-center justify-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>대표: {hospitalInfo.representative}</span>
              <span className="mx-2">|</span>
              <span>사업자등록번호: {hospitalInfo.businessNumber}</span>
            </p>
            <p>
              주소: {hospitalInfo.address}
              {hospitalInfo.addressDetail ? ` ${hospitalInfo.addressDetail}` : ""}
            </p>
            <p>
              © {currentYear} {hospitalInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
