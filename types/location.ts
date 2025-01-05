export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  businessNumber: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  director: string;
  medicalDepartments?: string[];
}
