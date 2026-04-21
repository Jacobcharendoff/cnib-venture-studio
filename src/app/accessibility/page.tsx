import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function AccessibilityPage() {
  return (
    <div className="bg-black min-h-screen">
      <Nav />
      <main id="main-content" className="pt-32 pb-20 px-6 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6">Accessibility</h1>
          <p className="text-gray-400 text-lg mb-4">The Venture Collective is built for blind and low-vision Canadians. Accessibility is not an afterthought here. It is the starting point.</p>
          <p className="text-gray-400 text-lg mb-4">This platform is designed to work with screen readers, keyboard navigation, and assistive technology from the ground up.</p>
          <p className="text-gray-400 text-lg">If you run into any barriers, please let us know. We will fix them.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
