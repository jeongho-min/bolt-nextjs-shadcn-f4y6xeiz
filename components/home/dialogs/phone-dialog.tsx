"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy, Phone } from "lucide-react";

const PHONE_NUMBERS = [
  { number: "062-369-2075", label: "이명치료" },
  { number: "062-571-2222", label: null },
];

interface PhoneDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PhoneDialog({ open, onOpenChange }: PhoneDialogProps) {
  const copyToClipboard = async (number: string) => {
    try {
      await navigator.clipboard.writeText(number);
      alert("전화번호가 복사되었습니다.");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>전화 문의</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-4">
          {PHONE_NUMBERS.map((phone) => (
            <div key={phone.number} className="flex flex-col items-center gap-3">
              <div className="flex items-center">
                <p className="text-2xl font-bold text-primary">{phone.number}</p>
                {phone.label && <span className="ml-2 text-sm text-primary">({phone.label})</span>}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => copyToClipboard(phone.number)}>
                  <Copy className="w-4 h-4 mr-2" />
                  복사하기
                </Button>
                <Button onClick={() => (window.location.href = `tel:${phone.number}`)}>
                  <Phone className="w-4 h-4 mr-2" />
                  전화걸기
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
