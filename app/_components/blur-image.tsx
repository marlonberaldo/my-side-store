"use client";

import { useState } from "react";

import Image, { ImageProps } from "next/image";

import { cn } from "@/lib/utils";

interface BlurImageProps extends ImageProps {
  className?: string;
}

export default function BlurImage({ className, alt, src, ...props }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      alt={alt}
      src={src}
      className={cn(
        isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0 ease-out duration-500 transition-transform",
        className,
      )}
      onLoad={() => setLoading(false)}
      {...props}
    />
  );
}