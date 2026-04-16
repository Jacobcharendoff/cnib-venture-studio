import Link from "next/link";

export const metadata = {
  title: "About | Venture Studio \u2014 Powered by CNIB",
  description:
    "Meet Jacob Charendoff \u2014 legally blind entrepreneur, builder, and your Venture Studio instructor.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-cnib-blue text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">
            About Your Instructor
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Jacob Charendoff \u2014 Entrepreneur, Builder & Proud Member of the CNIB
            Community
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-4">
              Turning Adversity Into Opportunity
            </h2>
            <p className="text-text-muted leading-relaxed mb-6">
              Jacob Charendoff is a legally blind entrepreneur who has built
              businesses across industries \u2014 from luxury hospitality in the
              mountains of Peru to boutique eCommerce brands trusted by global
              music retailers, to AI-powered healthtech platforms that
              personalize care.
            </p>
            <p className="text-text-muted leading-relaxed mb-6">
              His journey is raw, real, and full of hard-won lessons. Jacob
              didn&rsquo;t start with connections or capital \u2014 just curiosity,
              resilience, and a bias for action. Over the past decade, he&rsquo;s
              taken impossible ideas and turned them into revenue-generating
              ventures with global reach and seven-figure exits.
            </p>
            <p className="text-text-muted leading-relaxed mb-6">
              Along the way, he&rsquo;s led remote teams, built from the ground
              up, and learned how to create clarity in chaos. His unique
              perspective \u2014 shaped by a lifelong visual impairment \u2014 has allowed
              him to think differently, innovate beyond limitations, and inspire
              others to take bold action.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-10">
              Why This Program Exists
            </h2>
            <p className="text-text-muted leading-relaxed mb-6">
              This studio isn&rsquo;t based on theory. It&rsquo;s based on
              experience \u2014 and it&rsquo;s built to help you do the same.
            </p>
            <p className="text-text-muted leading-relaxed mb-6">
              Jacob&rsquo;s expertise spans business strategy, startup launches
              and exits, operational innovation, and team development &
              leadership. As your instructor, he brings practical, hands-on
              insights rooted in real-world experience, ensuring you gain
              tangible skills you can apply immediately.
            </p>
            <p className="text-text-muted leading-relaxed mb-6">
              Through this program, Jacob will not only teach business
              fundamentals but demonstrate how resilience, creativity, and vision
              can be leveraged to turn ideas into successful ventures. His story
              is a blueprint for entrepreneurs looking to break barriers,
              redefine success, and build thriving businesses in any industry.
            </p>

            <h2 className="text-2xl font-bold mb-4 mt-10">
              A Unique Opportunity for the CNIB Community
            </h2>
            <p className="text-text-muted leading-relaxed mb-6">
              This program is more than a structured course \u2014 it&rsquo;s a
              unique opportunity for CNIB entrepreneurs to learn from another
              CNIB community member who has successfully built businesses.
            </p>
            <p className="text-text-muted leading-relaxed mb-8">
              By combining proven frameworks, hands-on assignments, and
              real-world case studies, participants develop a business and gain
              the confidence and knowledge to turn their vision into a reality.
              With a strong emphasis on practical execution and peer learning,
              this program provides a collaborative environment where CNIB
              entrepreneurs can develop, refine, and launch their businesses.
            </p>

            <div className="bg-venture-warm border border-border-light rounded-xl p-6 mt-8">
              <h3 className="text-lg font-semibold mb-3">
                Experience Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  "Over a decade building and scaling businesses",
                  "Seven-figure exits across multiple industries",
                  "Led remote teams across North and South America",
                  "Luxury hospitality to AI-powered healthtech",
                  "Bootstrapped eCommerce with global distribution",
                  "Proud CNIB community member",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span
                      className="text-cnib-orange font-bold mt-0.5"
                      aria-hidden="true"
                    >
                      &#10003;
                    </span>
                    <span className="text-text-muted">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/curriculum"
              className="inline-block bg-cnib-blue hover:bg-cnib-blue-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors no-underline text-base"
            >
              View the Curriculum &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
