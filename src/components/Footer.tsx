import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-stone-100 dark:bg-emerald-950 tonal-shift bg-stone-200 dark:bg-emerald-900/50 full-width py-12 no-border flat no-shadows">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 max-w-7xl mx-auto gap-6">
        <div className="font-serif font-headline text-xl text-emerald-900 dark:text-emerald-50 italic">MMTC</div>
        <p className="font-sans font-label text-sm tracking-wide uppercase text-stone-500 dark:text-emerald-300/60 text-center">
          © {new Date().getFullYear()} Muda Mudi Tegal Cabakan.
        </p>
        <div className="flex gap-8">
          <Link className="text-stone-500 dark:text-emerald-300/60 font-sans font-label text-sm tracking-wide uppercase hover:text-emerald-700 dark:hover:text-emerald-300 transition-all opacity-80 hover:opacity-100 duration-300" href="#">About</Link>
          <Link className="text-stone-500 dark:text-emerald-300/60 font-sans font-label text-sm tracking-wide uppercase hover:text-emerald-700 dark:hover:text-emerald-300 transition-all opacity-80 hover:opacity-100 duration-300" href="#">Contact</Link>
          <Link className="text-stone-500 dark:text-emerald-300/60 font-sans font-label text-sm tracking-wide uppercase hover:text-emerald-700 dark:hover:text-emerald-300 transition-all opacity-80 hover:opacity-100 duration-300" href="/login">Admin Access</Link>
        </div>
      </div>
    </footer>
  );
}
