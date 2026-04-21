import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="bg-black min-h-screen">
      <Nav />
      <main id="main-content" className="pt-32 pb-20 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6">Privacy Policy</h1>
          <p className="text-gray-400 text-lg">Coming soon. We take your privacy seriously.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
