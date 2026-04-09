// Added React import to provide the React namespace for types like React.ReactNode
import React from 'react';

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Bonus {
  id: string;
  title: string;
  value: string;
  description: string;
  image: string;
}

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface Plan {
  name: string;
  price: string;
  originalPrice: string;
  features: PlanFeature[];
  popular?: boolean;
  cta: string;
}