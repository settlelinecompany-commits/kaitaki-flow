'use client'

const WIZARD_COMPLETED_KEY = 'kaitaki_wizard_completed';
const WIZARD_DATA_KEY = 'kaitaki_wizard_data';

export interface WizardData {
  organization: {
    companyName: string;
    location: string;
    industry: string;
    size: string;
  };
  roles: {
    controllerProcessor: string;
    operatingUnits: string[];
  };
  dataTypes: string[];
  processingActivities: string[];
  vendors: {
    useVendors: string;
    transferOutsideKSA: string;
    transferCountries: string[];
  };
  systems: string[];
}

export function isWizardCompleted(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(WIZARD_COMPLETED_KEY) === 'true';
}

export function setWizardCompleted(data: WizardData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WIZARD_COMPLETED_KEY, 'true');
  localStorage.setItem(WIZARD_DATA_KEY, JSON.stringify(data));
}

export function getWizardData(): WizardData | null {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(WIZARD_DATA_KEY);
  return data ? JSON.parse(data) : null;
}

export function resetWizard(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(WIZARD_COMPLETED_KEY);
  localStorage.removeItem(WIZARD_DATA_KEY);
}

