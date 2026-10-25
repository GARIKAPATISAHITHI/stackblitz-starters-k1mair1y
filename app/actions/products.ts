'use server';

export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  colour: string;
};

export type ProductResponse = {
  products: Product[];
  total: number;
};

const COLOURS = ['Black', 'Grey', 'Blue', 'Green', 'Pink'];

export async function getProducts(
  limit = 20,
  skip = 0,
  sortBy = '',
  order = 'asc'
): Promise<ProductResponse> {
  const params = new URLSearchParams({
    limit: String(limit),
    skip: String(skip),
  });

  if (sortBy) {
    params.set('sortBy', sortBy);
    params.set('order', order);
  }

  const response = await fetch(
    `https://dummyjson.com/products?${params.toString()}`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();

  const products: Product[] = data.products.map(
    (product: {
      id: number;
      title: string;
      price: number;
      thumbnail: string;
    }) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      colour: COLOURS[(product.id - 1) % COLOURS.length],
    })
  );

  return {
    products,
    total: data.total,
  };
}
