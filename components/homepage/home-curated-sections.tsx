'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { customerOrganizations } from '@/app/content';

const companyFacts = [{ value: 14, suffix: '+', label: 'Years of experience' }, { value: 12, suffix: '+', label: 'Products' }, { value: 7, suffix: '+', label: 'Countries served' }, { value: 2000, suffix: '+', label: 'Happy clients' }] as const;
const industries = [{ name: 'Pharma', slug: 'pharma' }, { name: 'Chemical', slug: 'chemical' }, { name: 'Textiles', slug: 'textiles' }, { name: 'Manufacturing', slug: 'manufacturing' }, { name: 'Service provider', slug: 'service-provider' }, { name: 'Engineering', slug: 'engineering' }, { name: 'Food industries', slug: 'food-industries' }] as const;
const industryCollage = [{ name: 'Pharma', image: '/campaign/industries/pharma-desktop-v2.webp' }, { name: 'Manufacturing', image: '/campaign/industries/manufacturing-desktop-v2.webp' }, { name: 'Corporate services', image: '/campaign/industries/corporate-desktop-v2.webp' }, { name: 'Hospitality', image: '/campaign/industries/hospitality-desktop-v2.webp' }] as const;
const clientQuotes = [{ quote: 'User-friendly system with accurate attendance tracking. Support response is quick and dependable.', source: 'IT Team, HCP Pvt. Ltd.', logo: '/clients/hcp-wellness-logo.png' }, { quote: 'Seamless hardware and software integration delivered on time. Highly satisfied with the service quality.', source: 'Indbest Healthcare Pvt. Ltd.', logo: '/clients/indbest-healthcare-logo.png' }] as const;
const news = [{ category: 'Customer support · Blog', title: "How we're using RAG to help customers solve problems faster", href: '/insights/using-rag-to-solve-customer-problems-faster', image: '/campaign/hero/innovation-desktop-v2.webp' }, { category: 'AI at work · Blog', title: 'How AI is making our daily work easier', href: '/insights/how-ai-makes-daily-work-easier', image: '/company/ai-cover-workplace.png' }, { category: 'Cloud attendance · Blog', title: 'Why your company needs EasyTime cloud attendance management', href: '/insights/easytime-cloud-attendance-benefits', image: '/campaign/hero/workforce-desktop-v2.webp' }, { category: 'Production technology · Blog', title: 'How AI technology is changing production lines', href: '/insights/ai-in-production-lines', image: '/campaign/industries/manufacturing-desktop-v2.webp' }] as const;

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { node.dataset.visible = 'true'; observer.disconnect(); } }, { threshold: .14 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div className={`home-reveal ${className}`.trim()} ref={ref}>{children}</div>;
}

function AnimatedCount({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(value); return; }
      const started = performance.now();
      const animate = (now: number) => { const progress = Math.min((now - started) / 1200, 1); setShown(Math.round(value * (1 - Math.pow(1 - progress, 3)))); if (progress < 1) requestAnimationFrame(animate); };
      requestAnimationFrame(animate);
    }, { threshold: .5 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);
  return <strong ref={ref}>{shown.toLocaleString('en-IN')}{suffix}</strong>;
}

export function CompanyOverview() {
  const destinationLogo = useRef<HTMLImageElement>(null);
  const travellingLogo = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const sourceLogo = document.querySelector<HTMLElement>('.site-header .brand');
    const destination = destinationLogo.current;
    const traveller = travellingLogo.current;
    if (!sourceLogo || !destination || !traveller || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const source = sourceLogo.getBoundingClientRect();
      const target = destination.getBoundingClientRect();
      const targetTop = target.top + window.scrollY;
      const start = Math.max(56, targetTop - window.innerHeight * .94);
      const end = Math.max(start + 1, targetTop - window.innerHeight * .1);
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
      const eased = progress * progress * (3 - 2 * progress);
      const moving = progress > 0 && progress < 1;

      sourceLogo.toggleAttribute('data-logo-travelling', progress > 0);
      destination.style.opacity = progress < 1 ? '0' : '';
      traveller.style.opacity = moving ? '1' : '0';
      traveller.style.left = `${source.left + (target.left - source.left) * eased}px`;
      traveller.style.top = `${source.top + (target.top - source.top) * eased}px`;
      traveller.style.width = `${source.width + (target.width - source.width) * eased}px`;
      traveller.style.height = `${source.height + (target.height - source.height) * eased}px`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      sourceLogo.removeAttribute('data-logo-travelling');
      destination.style.opacity = '';
    };
  }, []);

  return <>
    <Image ref={travellingLogo} className="company-travelling-logo" src="/indian-infotech-logo.png" alt="" width={520} height={188} aria-hidden="true" />
    <section className="home-company-page" aria-labelledby="why-indian-infotech">
      <div className="home-company-waves" aria-hidden="true"><i /><i /><i /></div>
      <Reveal className="home-company-identity">
        <Image ref={destinationLogo} className="company-destination-logo" src="/indian-infotech-logo.png" alt="Indian Infotech" width={520} height={188} />
        <Link className="home-certificate" href="/certification"><Image src="/iso-9001-certified.webp" alt="ISO 9001 certification information" width={440} height={160} /><span>Quality management certification · Learn why it matters →</span></Link>
        <div className="home-fact-strip" aria-label="Indian Infotech company facts">{companyFacts.map((fact) => <div key={fact.label}><AnimatedCount value={fact.value} suffix={fact.suffix} /><span>{fact.label}</span></div>)}</div>
      </Reveal>
      <div className="home-company-copy">
        <Reveal className="home-company-intro"><p>Why Indian Infotech</p><h2 id="why-indian-infotech">Practical technology. Dependable delivery.</h2><span>Since 2011, Indian Infotech has shaped workforce, access, and workplace systems around real operating needs—helping teams work with greater efficiency and security.</span></Reveal>
        <Reveal className="home-company-directions">
          <Link className="home-direction-card" href="/about-us#vision"><p>Our vision</p><h3>Customer-led innovation with global relevance.</h3><span>Scalable solutions that respond to evolving business needs.</span><b>Explore vision →</b></Link>
          <Link className="home-direction-card" href="/about-us#mission"><p>Our mission</p><h3>Efficient and secure everyday operations.</h3><span>Intuitive systems that strengthen productivity, security, and agility.</span><b>Explore mission →</b></Link>
        </Reveal>
      </div>
    </section>
  </>;
}

export function IndustriesAndClients() {
  return <section className="home-industry-client-page" aria-labelledby="home-industries-heading">
    <div className="home-industry-layout"><div><Reveal className="home-section-heading"><p>Industries</p><h2 id="home-industries-heading">Industry understanding, built into every solution.</h2><span>Seven sectors from Indian Infotech’s established portfolio.</span></Reveal><div className="home-industry-list">{industries.map((industry) => <div key={industry.slug}><Image src={`/industries/icons/${industry.slug}.png`} alt="" width={56} height={51} /><strong>{industry.name}</strong></div>)}</div></div>
      <Reveal className="home-industry-collage">{industryCollage.map((item) => <figure key={item.name}><Image src={item.image} alt={`${item.name} workplace`} fill sizes="(max-width: 760px) 50vw, 20vw" /><figcaption>{item.name}</figcaption></figure>)}</Reveal></div>
    <Reveal className="home-client-heading"><p>2,000+ clients served</p><h2>Trusted by organizations across industries and 7+ countries.</h2><span>The logos below are a selection from our 2,000+ client base.</span></Reveal>
    <div className="home-client-grid">{customerOrganizations.map((customer) => <div key={customer.name}><Image src={customer.logo} alt={customer.name} width={131} height={60} /></div>)}</div>
  </section>;
}

export function QuotesAndNews() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => { if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return; const timer = window.setInterval(() => setActive((current) => (current + 1) % news.length), 5000); return () => clearInterval(timer); }, [paused]);
  const move = (direction: number) => setActive((current) => (current + direction + news.length) % news.length);
  return <section className="home-quotes-news-page" aria-labelledby="client-quotes-heading">
    <Reveal className="home-section-heading"><p>Client’s Quote</p><h2 id="client-quotes-heading">Feedback from teams we support.</h2></Reveal>
    <div className="home-quote-grid">{clientQuotes.map((item) => <blockquote key={item.source}><div><span className="home-quote-logo"><Image src={item.logo} alt={`${item.source} logo`} fill sizes="110px" /></span><b aria-hidden="true">“</b></div><p>{item.quote}</p><cite>— {item.source}</cite></blockquote>)}</div>
    <div className="home-news-header-row"><div className="home-news-heading"><p>News &amp; blogs</p><h2>Practical thinking for modern workplaces.</h2></div><div className="home-news-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous article">←</button><button type="button" onClick={() => move(1)} aria-label="Next article">→</button></div></div>
    <div className="home-news-viewport" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)}><div className="home-news-track" style={{ transform: `translate3d(-${active * 100}%,0,0)` }}>{news.map((item) => <Link href={item.href} key={item.title}><div><Image src={item.image} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><span>{item.category}</span><h3>{item.title}</h3><b>Read more ↗</b></Link>)}</div></div>
    <div className="home-news-dots" aria-label="Choose article">{news.map((item, index) => <button type="button" aria-label={`Show ${item.title}`} aria-current={index === active} onClick={() => setActive(index)} key={item.title} />)}</div>
  </section>;
}
