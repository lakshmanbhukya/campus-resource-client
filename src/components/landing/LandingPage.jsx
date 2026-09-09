import React, { useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [activeBay, setActiveBay] = useState("textbooks");
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const categories = [
    {
      id: "textbooks",
      title: "Textbooks",
      description: "Course books between classes and semesters.",
      image:
        "https://images.pexels.com/photos/7054526/pexels-photo-7054526.jpeg?auto=compress&cs=tinysrgb&w=1000&q=80",
      narrow: false,
    },
    {
      id: "cameras",
      title: "Cameras",
      description: "Photography and video equipment for assignments.",
      image:
        "https://images.pexels.com/photos/7618402/pexels-photo-7618402.jpeg?auto=compress&cs=tinysrgb&w=1000&q=80",
      narrow: false,
    },
    {
      id: "lab",
      title: "Lab equipment",
      description: "Shareable tools for practical work.",
      image:
        "https://images.pexels.com/photos/9243533/pexels-photo-9243533.jpeg?auto=compress&cs=tinysrgb&w=1000&q=80",
      narrow: false,
    },
    {
      id: "sports",
      title: "Sports gear",
      description: "Equipment for practice and recreation.",
      image:
        "https://images.pexels.com/photos/38223413/pexels-photo-38223413.jpeg?auto=compress&cs=tinysrgb&w=1000&q=80",
      narrow: true,
    },
    {
      id: "instruments",
      title: "Musical instruments",
      description: "Instruments and accessories between rehearsals.",
      image:
        "https://images.pexels.com/photos/25959299/pexels-photo-25959299.jpeg?auto=compress&cs=tinysrgb&w=1000&q=80",
      narrow: true,
    },
  ];

  const faqs = [
    {
      q: "Who can list items on Campus Resource?",
      a: "Any registered student, faculty, or staff member can list items they are willing to share with campus peers.",
    },
    {
      q: "How do approvals and handoffs work?",
      a: "When a peer requests an item, the request appears directly in your inbox. You decide whether to approve or reject. Once agreed, you arrange the handoff on campus.",
    },
    {
      q: "How does return tracking work?",
      a: "Once an item is returned, the owner marks it as returned in their dashboard. The item automatically returns to available status for future requests.",
    },
    {
      q: "Is there any fee to borrow?",
      a: "Campus Resource is built for peer-to-peer campus sharing. It is free to list and free to borrow within your university community.",
    },
  ];

  return (
    <div className="cr-root min-h-screen bg-[#f7f4ed] text-[#1c1c1c] antialiased">
      {/* ============ NAVIGATION ============ */}
      <header className="sticky top-0 z-50 border-b border-[#eceae4] bg-[#f7f4ed]/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6">
          <Link
            to="/"
            className="text-[16px] font-semibold tracking-[-0.2px] hover:opacity-80 transition-opacity"
          >
            Campus Resource
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="#how"
              className="text-[15px] text-[#5f5f5d] transition-colors hover:text-[#1c1c1c]"
            >
              How it works
            </a>
            <a
              href="#categories"
              className="text-[15px] text-[#5f5f5d] transition-colors hover:text-[#1c1c1c]"
            >
              Categories
            </a>
            <a
              href="#faq"
              className="text-[15px] text-[#5f5f5d] transition-colors hover:text-[#1c1c1c]"
            >
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-ghost btn-sm">
              Log in
            </Link>
            <Link to="/register" className="btn-primary btn-sm">
              Start sharing
            </Link>
          </div>
        </div>
      </header>

      {/* ============ HERO SECTION ============ */}
      <section className="pt-12 md:pt-20 lg:pt-24">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h1 className="text-[42px] font-semibold leading-[1.05] tracking-[-1.2px] sm:text-[54px] lg:text-[64px] lg:tracking-[-1.6px]">
                Share what you own on campus
              </h1>
              <p className="mt-6 max-w-[48ch] text-[18px] leading-[1.45] text-[rgba(28,28,28,0.82)]">
                List textbooks, cameras, lab equipment, sports gear and instruments.
                Students request an item, its owner decides, and every return stays visible.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/register" className="btn-primary">
                  Start sharing
                </Link>
                <a
                  href="#how"
                  className="text-[15px] text-[#1c1c1c] underline decoration-[rgba(28,28,28,0.4)] underline-offset-4 hover:decoration-[#1c1c1c]"
                >
                  See how borrowing works
                </a>
              </div>
            </div>

            <figure className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-[#eceae4] shadow-sm">
                <img
                  alt="Two university students meeting on campus"
                  className="aspect-[4/3] w-full object-cover"
                  src="https://images.pexels.com/photos/37071199/pexels-photo-37071199.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80"
                />
              </div>
              <figcaption className="mt-3 text-[13px] text-[#5f5f5d]">
                A handoff on campus — one request, one decision, one recorded return.
              </figcaption>
            </figure>
          </div>

          <div className="mt-14 border-t border-[#eceae4] pt-4 lg:mt-20">
            <p className="text-[14px] text-[#5f5f5d]">
              Textbooks · cameras · lab gear · sports gear · instruments
            </p>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="scroll-mt-16 py-16 lg:py-24" id="how">
        <div className="mx-auto max-w-[1200px] px-6">
          <h2 className="max-w-[18ch] text-[32px] font-semibold leading-[1.1] tracking-[-1px] sm:text-[40px] lg:text-[48px] lg:tracking-[-1.2px]">
            From listing to return, one visible line
          </h2>

          <div className="relative mt-12 rounded-2xl border border-[#eceae4] bg-[#fcfbf8] p-6 sm:p-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Step 1 */}
              <div className="flex flex-col gap-3">
                <span className="cnode">1</span>
                <div className="flex items-center gap-2 text-[17px] font-semibold">
                  <i className="ti ti-package-plus text-[18px]"></i>
                  <h3>List your item</h3>
                </div>
                <p className="text-[14px] leading-relaxed text-[#5f5f5d]">
                  Add title, category, and condition for items you're happy to share.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col gap-3">
                <span className="cnode">2</span>
                <div className="flex items-center gap-2 text-[17px] font-semibold">
                  <i className="ti ti-hand-stop text-[18px]"></i>
                  <h3>A student requests it</h3>
                </div>
                <p className="text-[14px] leading-relaxed text-[#5f5f5d]">
                  The request arrives in your owner dashboard as Pending.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col gap-3">
                <span className="cnode">3</span>
                <div className="flex items-center gap-2 text-[17px] font-semibold">
                  <i className="ti ti-git-branch text-[18px]"></i>
                  <h3>You decide</h3>
                </div>
                <p className="text-[14px] leading-relaxed text-[#5f5f5d]">
                  Approved and Rejected appear as clear, explicit branches.
                </p>
                <div className="mt-1 flex flex-wrap gap-2">
                  <span className="pill pill-approved text-[11px]">
                    <i className="ti ti-check"></i> Approved
                  </span>
                  <span className="pill pill-rejected text-[11px]">
                    <i className="ti ti-x"></i> Rejected
                  </span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col gap-3">
                <span className="cnode">4</span>
                <div className="flex items-center gap-2 text-[17px] font-semibold">
                  <i className="ti ti-arrow-back-up text-[18px]"></i>
                  <h3>Record the return</h3>
                </div>
                <p className="text-[14px] leading-relaxed text-[#5f5f5d]">
                  Once the item is back, mark Returned so it's ready for the next student.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THE SHARED SHELF (ACCORDION BAYS) ============ */}
      <section className="scroll-mt-16 py-12 lg:py-20" id="categories">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-10">
            <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-1px] sm:text-[40px] lg:text-[48px] lg:tracking-[-1.2px]">
              The shared shelf
            </h2>
            <p className="mt-3 max-w-[50ch] text-[16px] text-[rgba(28,28,28,0.82)]">
              Five categories, one circulation desk. Choose a bay to see what moves between students.
            </p>
          </div>

          <div className="shelf" id="shelf">
            {categories.map((cat) => {
              const isActive = activeBay === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={isActive}
                  data-active={isActive ? "true" : "false"}
                  onClick={() => setActiveBay(cat.id)}
                  className={`bay ${cat.narrow ? "bay-narrow" : ""}`}
                >
                  <img alt={cat.title} src={cat.image} decoding="async" loading="lazy" />
                  <span className="bay-spine">
                    <span>{cat.title}</span>
                  </span>
                  <span className="bay-chip">
                    <span className="block text-[18px] font-semibold text-[#1c1c1c]">
                      {cat.title}
                    </span>
                    <p className="mt-1 text-[13px] text-[#5f5f5d]">
                      {cat.description}
                    </p>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ STATS BAR ============ */}
      <section className="border-y border-[#eceae4] bg-[#fcfbf8] py-14">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="border-r border-[#eceae4] pr-4">
              <p className="text-[40px] font-semibold leading-none tracking-[-1px] tabular-nums lg:text-[48px]">
                132
              </p>
              <p className="mt-2 text-[14px] text-[rgba(28,28,28,0.82)]">
                Items listed
              </p>
            </div>
            <div className="md:border-r border-[#eceae4] pr-4">
              <p className="text-[40px] font-semibold leading-none tracking-[-1px] tabular-nums lg:text-[48px]">
                87
              </p>
              <p className="mt-2 text-[14px] text-[rgba(28,28,28,0.82)]">
                Available now
              </p>
            </div>
            <div className="border-r border-[#eceae4] pr-4">
              <p className="text-[40px] font-semibold leading-none tracking-[-1px] tabular-nums lg:text-[48px]">
                214
              </p>
              <p className="mt-2 text-[14px] text-[rgba(28,28,28,0.82)]">
                Borrow requests
              </p>
            </div>
            <div>
              <p className="text-[40px] font-semibold leading-none tracking-[-1px] tabular-nums lg:text-[48px]">
                161
              </p>
              <p className="mt-2 text-[14px] text-[rgba(28,28,28,0.82)]">
                Returns recorded
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ SECTION ============ */}
      <section className="scroll-mt-16 py-16 lg:py-24" id="faq">
        <div className="mx-auto max-w-[800px] px-6">
          <h2 className="text-[32px] font-semibold leading-[1.1] tracking-[-1px] sm:text-[40px] lg:text-[44px]">
            Frequently asked questions
          </h2>

          <div className="mt-10 divide-y divide-[#eceae4] border-y border-[#eceae4]">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="faq-item py-5" data-open={isOpen ? "true" : "false"}>
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between text-left text-[17px] font-semibold text-[#1c1c1c]"
                  >
                    <span>{faq.q}</span>
                    <i
                      className={`ti ${
                        isOpen ? "ti-minus" : "ti-plus"
                      } text-[18px] text-[#5f5f5d] transition-transform`}
                    ></i>
                  </button>
                  <div className="faq-a mt-2">
                    <div>
                      <p className="text-[15px] leading-relaxed text-[#5f5f5d]">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="border-t border-[#eceae4] bg-[#1c1c1c] text-[#fcfbf8] py-16">
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <h2 className="text-[32px] font-semibold leading-tight sm:text-[40px]">
            Ready to share resources on your campus?
          </h2>
          <p className="mx-auto mt-4 max-w-[44ch] text-[16px] text-[#eceae4]/80">
            Join your university community today. List your equipment or request what you need.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/register"
              className="rounded-md bg-[#fcfbf8] px-6 py-2.5 text-[15px] font-medium text-[#1c1c1c] hover:bg-white transition-colors"
            >
              Create an account
            </Link>
            <Link
              to="/login"
              className="rounded-md border border-[#eceae4]/40 px-6 py-2.5 text-[15px] font-medium text-[#fcfbf8] hover:bg-white/10 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-[#eceae4] py-8 text-center text-[13px] text-[#5f5f5d]">
        <div className="mx-auto max-w-[1200px] px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>© Campus Resource. Built for university student communities.</span>
          <div className="flex items-center gap-6">
            <a href="#how" className="hover:text-[#1c1c1c]">How it works</a>
            <a href="#categories" className="hover:text-[#1c1c1c]">Categories</a>
            <a href="#faq" className="hover:text-[#1c1c1c]">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
