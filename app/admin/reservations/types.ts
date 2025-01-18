import { Reservation, ReservationStatus, User, Doctor, Department } from "@prisma/client";

export type ReservationWithDetails = Reservation & {
  user: User | null;
  doctor:
    | (Doctor & {
        department: Department;
      })
    | null;
  isNonMember?: boolean;
};
