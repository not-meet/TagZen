import React from "react";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <section className="px-6 md:px-20 py-24 border-2 border-red-500">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">Smart shopping starts here:
              <Image src="/assets/icons/arrow-right.svg" alt='arrow-right' width={26} height={26} />
            </p>

            <h1 className="head-text">Get Steps Ahead with <span className="text-primary">TagZen!</span></h1>
            <p className="mt-6">Powerfull, self-serve product and growth analytics to help you convert, engage and retain more..</p>
            SearchBar
          </div>
          Hero Carousel
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text">Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {['apple', 'iphone', 'book', 'Sneakers'].map((product) => (
            <div>{product}</div>
          ))}
        </div>
      </section>
    </>
  );
}
