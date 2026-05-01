import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-stone-100 dark:bg-emerald-900 docked full-width top-0 sticky z-50 bg-slate-50/80 dark:bg-emerald-950/80 backdrop-blur-md no-border">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-serif font-headline text-emerald-900 dark:text-emerald-50 italic font-medium">
          MMTC
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-stone-600 dark:text-emerald-200/70 font-sans font-body hover:text-emerald-900 transition-colors duration-300">Home</Link>
          <Link href="/about" className="text-stone-600 dark:text-emerald-200/70 font-sans font-body hover:text-emerald-900 transition-colors duration-300">About</Link>
          <Link href="/gallery" className="text-stone-600 dark:text-emerald-200/70 font-sans font-body hover:text-emerald-900 transition-colors duration-300">Gallery</Link>
          <Link href="/keuangan" className="text-stone-600 dark:text-emerald-200/70 font-sans font-body hover:text-emerald-900 transition-colors duration-300">Keuangan</Link>
          <Link href="/presensi" className="text-stone-600 dark:text-emerald-200/70 font-sans font-body hover:text-emerald-900 transition-colors duration-300">Presensi</Link>
        </nav>
        <Link href="/login" className="bg-primary text-on-primary px-6 py-2 rounded-full font-label text-sm uppercase tracking-wider hover:scale-95 duration-200 transition-transform hidden md:block">
          Login
        </Link>
      </div>
    </header>
  );
}
