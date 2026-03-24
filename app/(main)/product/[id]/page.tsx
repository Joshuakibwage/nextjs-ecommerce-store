import React from "react";
import { fetchProductById } from "@/lib/supabase/server";
import ProductDetails from "@/components/layout/ProductDetails";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


const Page = async ({ params }: { params: { id: string } }) => {

  const { id } = await params;

  const product = await fetchProductById(id);

  return (
    <div className="w-full">
      <div className="w-[90%] mx-auto mt-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            
            <BreadcrumbItem>
              <BreadcrumbPage>Product detail</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    
      <ProductDetails product={product} />
    </div>
  );
};

export default Page;