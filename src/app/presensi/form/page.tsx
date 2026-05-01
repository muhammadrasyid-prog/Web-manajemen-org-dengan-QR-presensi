import PresenceForm from "@/components/PresenceForm";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function FormPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const meetingStr = searchParams.meeting;
  const meetingNo = meetingStr ? parseInt(Array.isArray(meetingStr) ? meetingStr[0] : meetingStr) : 1;

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-low">
      <header className="p-6 text-center bg-white/80 shadow-sm backdrop-blur">
        <Link href="/" className="font-serif font-headline text-2xl text-emerald-900 italic hover:opacity-80">
          MMTC
        </Link>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center w-full px-6 py-12">
        <div className="w-full max-w-sm">
          <PresenceForm meetingNo={meetingNo || 1} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
