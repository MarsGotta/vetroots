"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function HeaderSearchBar() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (q) {
      router.push(`/busqueda?q=${encodeURIComponent(q)}`);
      setValue("");
      inputRef.current?.blur();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative hidden sm:block">
      <svg
        className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar..."
        className="w-44 rounded-[var(--radius-md)] border border-border-subtle bg-surface-elevated py-1.5 pl-8 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:w-64 focus:border-brand-secondary focus:outline-none focus:ring-1 focus:ring-brand-secondary transition-[width]"
      />
    </form>
  );
}
