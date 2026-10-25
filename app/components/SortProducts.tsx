'use client';

type SortProductsProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SortProducts({ value, onChange }: SortProductsProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label="Sort products"
      className="w-56 border border-gray-200 bg-white px-5 py-4 text-base"
    >
      <option value="">Sort By</option>
      <option value="title-asc">Name: A-Z</option>
      <option value="title-desc">Name: Z-A</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
    </select>
  );
}
