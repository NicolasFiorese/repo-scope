import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { RepositorySection } from "@/components/repository-section";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <RepositorySection />
      </main>
    </>
  );
}