import Image from "next/image";

interface Props {
  src?: string;
  alt?: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
  width: number;
  height: number;
}

const ProductImage = ({ src, alt, className, width, height, style }: Props) => {
  const localSrs = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/imgs/placeholder.jpg";

  return (
    <Image
      className={className}
      src={localSrs}
      width={width}
      height={height}
      alt={alt ?? ""}
      style={style}
    />
  );
};

export default ProductImage;
