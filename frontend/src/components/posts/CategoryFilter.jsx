"use client";

import { CANCER_CATEGORIES } from "../../lib/constants";

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-display font-semibold text-text-primary">
          Filter by Category
        </h3>
      </div>
      
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full sm:w-auto min-w-[200px] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all duration-normal appearance-none pr-10 font-medium"
          style={{
            backgroundColor: 'rgb(var(--color-background))',
            border: '1px solid rgb(var(--color-border))',
            color: 'rgb(var(--color-text-primary))',
            backgroundImage: "url(" + encodeURI("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23B8C1CF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E") + "" + ")",
            backgroundPosition: "right 0.75rem center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "1.25em 1.25em"
          }}
        >
          {CANCER_CATEGORIES.map(category => (
            <option 
              key={category.value} 
              value={category.value}
              style={{
                backgroundColor: 'rgb(var(--color-surface))', 
                color: 'rgb(var(--color-text-primary))'
              }}
            >
              {category.emoji} {category.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}