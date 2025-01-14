import { MapPin, Phone, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">진료시간</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>평일: 09:00 - 17:30</p>
              <p>토요일: 09:00 - 13:00</p>
              <p>점심시간: 12:30 - 14:30</p>
              <p className="text-primary">일요일/공휴일 휴진</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">연락처</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                062-369-2075
                <span className="ml-2 text-primary">(이명치료)</span>
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                062-571-2222
              </p>
              <p className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                광주광역시 북구 일곡동 840-2번지
              </p>
              <p className="ml-6">(양일로 307)</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">진료과목</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <span>내과</span>
              <span>침구과</span>
              <span>부인과</span>
              <span>소아과</span>
              <span>재활의학과</span>
              <span>사상체질과</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">© 2024 소리청 일곡에스한방병원. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
