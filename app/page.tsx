import { getProducts } from './actions/products';
import ProductGrid from './components/ProductGrid';

export default async function Home() {
  const data = await getProducts(20, 0);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <nav aria-label="Breadcrumb" className="mb-10 text-sm text-gray-500">
        Women's / Leggings
      </nav>

      <header className="mb-14">
        <h1 className="text-4xl font-semibold tracking-tight">
          Women's Leggings
        </h1>

        <p className="mt-3 text-base text-gray-500">Shop women's leggings</p>
      </header>

      <ProductGrid initialProducts={data.products} total={data.total} />
    </main>
  );
}
