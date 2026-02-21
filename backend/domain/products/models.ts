export type Currency = "BRL" | "USD" | "EUR";
export type MarketRegion = "BR" | "US" | "EU";
export type MonitorType = "price" | "availability" | "price_and_availability";

export type DiscoveryStatus = "PENDING" | "IN_PROGRESS" | "READY" | "FAILED";

export type ConceptualProduct = {
  id: string;
  userId: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  versionGeneration: string;
  storage: string;
  color: string;
  voltage: string | null;
  defaultCondition: string;
  marketRegion: MarketRegion | string;
  baseCurrency: Currency | string;
  collectionFrequencyMinutes: number;
  monitorType: MonitorType | string;
  discoveryStatus: DiscoveryStatus | string;
  isActive: boolean;
  createdAt: Date;
};

export type CreateConceptualProductInput = {
  name: string;
  category: string;
  brand: string;
  model: string;
  versionGeneration: string;
  storage: string;
  color: string;
  voltage?: string;
  defaultCondition: string;
  marketRegion: MarketRegion | string;
  baseCurrency: Currency | string;
  collectionFrequencyMinutes: number;
  monitorType: MonitorType | string;
};
