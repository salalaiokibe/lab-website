import Nav from "@/components/Nav";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white text-gray-900">
      <Nav />
      <main>{children}</main>
      <footer className="border-t border-gray-200 mt-20">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <div>
            <p className="font-medium text-gray-600">清水亮研究会</p>
            <p>慶應義塾大学 環境情報学部 / 湘南藤沢キャンパス</p>
          </div>
          <p>© {new Date().getFullYear()} Shimizu Lab, Keio SFC</p>
        </div>
      </footer>
    </div>
  );
}
