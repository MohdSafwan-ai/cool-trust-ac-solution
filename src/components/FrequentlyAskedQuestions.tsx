import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';
import { faqs } from '@/data/faqs';
import StructuredData from '@/components/StructuredData';
import { faqStructuredData } from '@/lib/structured-data';

export default function FrequentlyAskedQuestions() {
  return (
    <section
      className="section container faq-section"
      id="common-questions"
      aria-labelledby="common-questions-title"
    >
      <StructuredData data={faqStructuredData()} />
      <div className="section-heading">
        <div>
          <span className="eyebrow">BEFORE YOU GET IN TOUCH</span>
          <h2 id="common-questions-title">Common questions</h2>
          <p>Helpful details about our services and enquiries.</p>
        </div>
        <Link href="/contact" className="text-link">
          Contact details
          <ArrowRight size={17} />
        </Link>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <details
            className="faq-item"
            key={faq.question}
            id={`question-${index + 1}`}
          >
            <summary>
              <span>{faq.question}</span>
              <Plus size={18} aria-hidden="true" />
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
