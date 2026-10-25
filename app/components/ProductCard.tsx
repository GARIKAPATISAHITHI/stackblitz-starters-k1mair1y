import Image from 'next/image';
import type { Product } from '../actions/products';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="min-w-0">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
      </div>

      <div className="pt-4">
        <h2 className="text-base font-medium leading-snug">{product.title}</h2>

        <p className="mt-1 text-base">${product.price.toFixed(2)}</p>

        <p className="mt-1 text-gray-500">{product.colour}</p>
      </div>
    </article>
  );
}
