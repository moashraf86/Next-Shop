import { Product } from "@/lib/definitions";

type childrenType = { type: string; text: string; bold?: boolean };

type blockType = {
  type: string;
  children: childrenType[];
  format?: string;
};

export default function ProductDescription({
  description,
}: {
  description: Product["description"];
}) {
  const renderChildren = (children: { text: string; bold?: boolean }[]) => {
    return children.map((child, i) => (
      <span key={i} style={{ fontWeight: child.bold ? "bold" : "normal" }}>
        {child.text}
      </span>
    ));
  };

  const renderBlock = (block: blockType, index: number) => {
    if (block.type === "paragraph") {
      return <p key={index}>{renderChildren(block.children)}</p>;
    }

    if (block.type === "list") {
      const ListTag = block.format === "ordered" ? "ol" : "ul";
      return (
        <ListTag
          key={index}
          className="pl-5 space-y-1 list-disc marker:text-gray-500"
        >
          {block.children.map((item: any, i: number) => (
            <li key={i}>{renderChildren(item.children)}</li>
          ))}
        </ListTag>
      );
    }

    return null;
  };

  return <div className="space-y-4">{description.map(renderBlock)}</div>;
}
