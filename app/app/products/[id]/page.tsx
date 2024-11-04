import { Product } from "@/app/types";
import { getProductByid } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: { id: string }
}

const ProductDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductByid(id);
  if (!product) redirect('/');
  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image src={product.image} alt={product.title} height={400} width={580} className="mx-auto" />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {product.title}
              </p>
              <Link href={product.url} target="_blank" className='text-base opacity-50 text-black'>Visit Product</Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <Image src='/assets/icons/red-heart.svg' alt="red-heart" width={20} height={20} />
                <p className="text-base font-semibold text-[#D46F77]">{product.reviewsCount}</p>
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image src='/assets/icons/bookmark.svg' alt="book_mark" width={20} height={20} />
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image src='/assets/icons/share.svg' alt="shares" width={20} height={20} />
              </div>
            </div>
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[38px] text-secondary font-bold">{product.currency}{formatNumber(product.currentPrice)}</p>
              <p className="text-[21px] text-black opacity-50 line-through">{product.currency}{formatNumber(product.originalPrice)}</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image src='/assets/icons/star.svg' alt="star" width={16} height={16} />
                  <p className="text-sm text-primary-orange font-semibold">{product.stars || '25'}</p>
                </div>
                <div className="product-reviews">
                  <Image src='/assets/icons/comment.svg' alt="comment" width={16} height={16} />
                  <p className="text-sm text-secondary font-semibold">{product.reviewsCount || '10'}</p>
                </div>
              </div>
              <p className="text-black opacity-50 text-sm">
                <span className="text-primary-green font-semibold">92%</span> of buyers have reccomended this.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails;
