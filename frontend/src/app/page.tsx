"use client";
import ErrorBoundary from "./Components/common/errorboundary";
import HowWeDoIt from "./layout/HowWeDo";
import Header from "./layout/Header";
import HeroSection from "./layout/Hero";
import PricingSection from "./layout/PriceSection";

export default function Home() {
  return (
    <>
      <ErrorBoundary>
        <div className='min-h-screen flex flex-col'>
          <Header />
          <main className='flex-grow'>
            <HeroSection />
            <HowWeDoIt />
            <PricingSection />
          </main>
        </div>
      </ErrorBoundary>
    </>
  );
}
