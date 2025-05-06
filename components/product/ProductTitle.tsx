export default function ProductTitle({ title }: { title: string }) {
  return (
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-light uppercase leading-tight tracking-tight">
      {title}
    </h1>
  );
}
