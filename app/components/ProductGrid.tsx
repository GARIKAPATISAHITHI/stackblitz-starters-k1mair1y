'use client';

import { useMemo, useState } from 'react';
import { getProducts, type Product } from '../actions/products';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import SortProducts from './SortProducts';

type ProductGridProps = {
  initialProducts: Product[];
  total: number;
};

export default function ProductGrid({
  initialProducts,
  total,
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [visibleCount, setVisibleCount] = useState(initialProducts.length);
  const [selectedColour, setSelectedColour] = useState('All colours');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredProducts = useMemo(() => {
    if (selectedColour === 'All colours') {
      return products;
    }

    return products.filter((product) => product.colour === selectedColour);
  }, [products, selectedColour]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const handleColourChange = async (colour: string) => {
    setSelectedColour(colour);
    setVisibleCount(20);

    if (colour === 'All colours') {
      return;
    }

    if (products.length < total) {
      setLoading(true);

      try {
        const data = await getProducts(total, 0);

        setProducts(data.products);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSortChange = async (value: string) => {
    setSort(value);

    if (!value) {
      setProducts(initialProducts);
      setVisibleCount(20);
      return;
    }

    const [sortBy, order] = value.split('-');

    setLoading(true);

    try {
      const data = await getProducts(total, 0, sortBy, order);

      setProducts(data.products);
      setVisibleCount(20);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (products.length >= total) {
      setVisibleCount((current) =>
        Math.min(current + 20, filteredProducts.length)
      );
      return;
    }

    setLoading(true);

    try {
      const data = await getProducts(20, products.length);

      setProducts((current) => {
        const existingIds = new Set(current.map((product) => product.id));

        const newProducts = data.products.filter(
          (product) => !existingIds.has(product.id)
        );

        return [...current, ...newProducts];
      });

      setVisibleCount((current) => current + 20);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <FilterSidebar
        selectedColour={selectedColour}
        onColourChange={handleColourChange}
      />

      <div className="min-w-0 flex-1">
        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base">
            Viewing 1 to {visibleProducts.length} of {total} products
          </p>

          <SortProducts value={sort} onChange={handleSortChange} />
        </div>

        {loading && (
          <p className="mb-5 text-sm text-gray-500">Loading products...</p>
        )}

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {visibleProducts.length === 0 && !loading && (
          <p className="py-20 text-center text-gray-500">No products found.</p>
        )}

        {visibleProducts.length < filteredProducts.length ||
        products.length < total ? (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={loading}
              className="border border-gray-300 bg-white px-10 py-4 text-base font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Load more'}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
