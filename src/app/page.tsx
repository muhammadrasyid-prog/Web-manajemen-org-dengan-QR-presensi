import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import StatBar from "@/components/StatBar";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export default async function Home() {
  const { count: membersCount } = await supabase
    .from("members")
    .select("*", { count: "exact", head: true });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <StatBar totalMembers={membersCount || 0} />
      </main>
      <Footer />
    </div>
  );
}
