import Link from "next/link";

export const metadata = {
  title: "About | Venture Studio",
  description: "Meet Jacob Charendoff — legally blind entrepreneur, builder, and your Venture Studio instructor.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-cnib-black text-white py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-cnib-yellow text-sm font-medium uppercase tracking-widest mb-6">Your Instructor</p>
          <h1 className="hero-heading">Jacob Charendoff</h1>
          <p className="mt-6 text-lg text-white/60 max-w-2xl mx-auto">
            Entrepreneur. Builder. Proud member of the CNIB community.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">Turning adversity into opportunity</h2>
              <div className="space-y-4 text-text-secondary leading-relaxed text-lg">
                <p>
                  Jacob Charendoff is a legally blind entrepreneur who has built businesses across industries &mdash; from luxury hospitality in the mountains of Peru to boutique eCommerce brands trusted by global music retailers, to AI-powered healthtech platforms that personalize care.
                </p>
                <p>
                  His journey is raw, real, and full of hard-won lessons. Jacob didn&rsquo;t start with connections or capital &mdash; just curiosity, resilience, and a bias for action. Over the past decade, he&rsquo;s taken impossible ideas and turned them into revenue-generating ventures with global reach.
                </p>
                <p>
                  Along the way, he&rsquo;s led remote teams, built from the ground up, and learned how to create clarity in chaos. His unique perspective &mdash; shaped by a lifelong visual impairment &mdash; has allowed him to think differently, innovate beyond limitations, and inspire others to take bold action.
                </p>
              </div>
            </div>

            <div className="border-t border-border-light pt-16">
              <h2 className="text-2xl font-bold mb-6">Why this program exists</h2>
              <div className="space-y-4 text-text-secondary leading-relaxed text-lg">
                <p>
                  This studio isn&rsquo;t based on theory. It&rsquo;s based on experience &mdash; and it&rsquo;s built to help you do the same.
                </p>
                <p>
                  Jacob&rsquo;s expertise spans business strategy, startup launches and exits, operational innovation, and team leadership. As your instructor, he brings practical, hands-on insights rooted in real-world experience.
                </p>
                <p>
                  Through this program, Jacob will demonstrate how resilience, creativity, and vision can be leveraged to turn ideas into successful ventures. His story is a blueprint for entrepreneurs looking to break barriers and build thriving businesses.
                </p>
              </div>
            </div>

            <div className="border-t border-border-light pt-16">
              <h2 className="text-2xl font-bold mb-6">A unique opportunity</h2>
              <div className="space-y-4 text-text-secondary leading-relaxed text-lg">
                <p>
                  This program is more than a course &mdash; it&rsquo;s a chance for CNIB entrepreneurs to learn from another CNIB community member who has successfully built businesses.
                </p>
                <p>
                  By combining proven frameworks, hands-on assignments, and real-world case studies, participants develop a business and gain the confidence to turn their vision into reality.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 bg-cnib-warm rounded-2xl p-10">
            <h3 className="text-lg font-semibold mb-6">Experience</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                "Over a decade building and scaling businesses",
                "Seven-figure exits across multiple industries",
                "Led remote teams across North and South America",
                "Luxury hospitality to AI-powered healthtech",
                "Bootstrapped eCommerce with global distribution",
                "Proud CNIB community member",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="text-cnib-yellow font-bold mt-0.5" aria-hidden="true">&#10003;</span>
                  <span className="text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/curriculum"
              className="inline-block bg-cnib-black text-white font-medium px-8 py-3.5 rounded-full transition-colors hover:bg-cnib-dark no-underline text-sm"
            >
              View the Curriculum &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
