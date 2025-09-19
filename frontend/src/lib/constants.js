// Cancer categories for filtering and post categorization
export const CANCER_CATEGORIES = [
  { value: 'all', label: 'All Categories', emoji: '🌟' },
  { value: 'lung', label: 'Lung Cancer', emoji: '🫁' },
  { value: 'breast', label: 'Breast Cancer', emoji: '🎗️' },
  { value: 'prostate', label: 'Prostate Cancer', emoji: '💙' },
  { value: 'colorectal', label: 'Colorectal Cancer', emoji: '🔵' },
  { value: 'skin', label: 'Skin Cancer', emoji: '☀️' },
  { value: 'bladder', label: 'Bladder Cancer', emoji: '💛' },
  { value: 'lymphoma', label: 'Non-Hodgkin Lymphoma', emoji: '🟣' },
  { value: 'kidney', label: 'Kidney Cancer', emoji: '🟠' },
  { value: 'endometrial', label: 'Endometrial Cancer', emoji: '💗' },
  { value: 'leukemia', label: 'Leukemia', emoji: '🔴' },
  { value: 'other', label: 'Other', emoji: '🤝' }
];

// Get category by value
export const getCategoryByValue = (value) => {
  return CANCER_CATEGORIES.find(cat => cat.value === value) || CANCER_CATEGORIES[0];
};

// Get category label with emoji
export const getCategoryLabel = (value) => {
  const category = getCategoryByValue(value);
  return `${category.emoji} ${category.label}`;
};