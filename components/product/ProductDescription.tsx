import { Product } from "@/lib/definitions";

export default function ProductDescription({
  description,
}: {
  description: Product["description"];
}) {
  return (
    <>
      {description.map(
        (
          block: { type: string; children: { text: string }[] },
          index: number
        ) => {
          if (block.type === "paragraph") {
            return (
              <p key={index}>
                {block.children.map((child, i) => (
                  <span key={i}>{child.text}</span>
                ))}
              </p>
            );
          }
          return null;
        }
      )}
    </>
  );
}
