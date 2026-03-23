import React from "react";
import { fetchProductById } from "@/lib/supabase/server";
import ProductDetails from "@/components/layout/ProductDetails";

const Page = async ({ params }: { params: { id: string } }) => {

  const { id } = await params;

  const product = await fetchProductById(id);

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default Page;