import HowWeDoIt from "./Components/HowWeDo";
import Header from "./layout/Header";
import HeroSection from "./layout/Hero";

export default function Home() {
  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <Header />
        <main className='flex-grow'>
          <HeroSection />
          <HowWeDoIt />
        </main>
      </div>
    </>
  );
}
