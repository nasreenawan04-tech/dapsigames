import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="space-y-4" data-testid="faq-accordion">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border border-border rounded-2xl overflow-hidden"
          data-testid={`faq-item-${index}`}
        >
          <AccordionTrigger 
            className="px-6 py-4 text-left font-semibold bg-card hover:bg-muted transition-colors"
            data-testid={`faq-question-${index}`}
          >
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="px-6 py-4 bg-muted" data-testid={`faq-answer-${index}`}>
            <p className="text-muted-foreground">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
