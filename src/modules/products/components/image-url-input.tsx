"use client";

import { useState } from "react";
import Image from "next/image";

const inputClass =
  "w-full border border-zinc-200 p-3 rounded-lg text-sm focus:outline-none focus:border-zinc-400 transition-colors";

interface ImageUrlInputProps {
  defaultValue?: string;
}

export function ImageUrlInput({ defaultValue = "" }: ImageUrlInputProps) {
  const [value, setValue] = useState(defaultValue);

  const urls = value
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.startsWith("http"));

  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-zinc-400 mb-1.5 block">
        Image URLs
      </label>
      <textarea
        name="images"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
        rows={2}
        className={inputClass}
      />
      <p className="text-xs text-zinc-400 mt-1">
        Comma-separated URLs. First image is the main product image.
      </p>

      {urls.length > 0 && (
        <div className="flex gap-3 mt-3 flex-wrap">
          {urls.map((url, i) => (
            <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-zinc-100 bg-zinc-50">
              <Image
                src={url}
                alt={`Preview ${i + 1}`}
                fill
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              {i === 0 && (
                <span className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[9px] text-center py-0.5">
                  Main
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
