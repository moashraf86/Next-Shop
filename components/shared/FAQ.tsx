import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function FAQ() {
  const questions = [
    {
      id: 1,
      question: "Is the shipping free?",
      answer:
        "Yes. Worldwide shipping is already included in the price. We use DHL express with 3 days delivery time.",
    },
    {
      id: 2,
      question: "When will i receive my item?",
      answer:
        "When we have received your order, you will automatically receive an e-mail confirming your order. Orders made before 2 PM (CET) will be picked, packed and shipped the same day. Delivery time is usually 2-4 working days with DHL Express.",
    },
    {
      id: 3,
      question: "How do I chnage the strap?",
      answer:
        "All our straps (except 3-Links and 5-Links) fit each model of our automatic and quartz watches. We offer interchangeable straps, and you can therefore change them by hand in seconds without any tools. You can see our interchangeable strap guide in our online shop www.aboutvintage.com under each strap that we offer.",
    },
    {
      id: 4,
      question: "Can I change or return my item?",
      answer:
        "If you want to change a product into another model, strap color etc., please contact us so we are able to reserve the new item in our stock immediately. You are always entitled to an exchange or refund within 30 days after you have received your package, as long as the item has not been used.",
    },
  ];
  return (
    <div className="container max-w-screen-sm mb-20">
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-light uppercase leading-tight tracking-tight">
        Faq
      </h1>
      <Accordion type="single" collapsible className="mt-10">
        {questions.map((item) => (
          <AccordionItem key={item.id} value={`item-${item.id}`}>
            <AccordionTrigger className="font-barlow font-semibold tracking-[1px] hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="font-barlow space-y-2">
              <p>{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
