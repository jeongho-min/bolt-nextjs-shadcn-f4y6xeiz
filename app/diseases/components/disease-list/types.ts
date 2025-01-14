export interface Disease {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  definition: string;
  symptoms: {
    physical: string[];
    mental: string[];
  };
  causes: {
    title: string;
    description: string;
  }[];
  treatments: {
    title: string;
    description: string;
  }[];
  statistics?: {
    title: string;
    description: string;
    source?: string;
  };
  imagePath?: string;
}
