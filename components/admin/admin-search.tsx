"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";

export default function AdminSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const formActionUrl = pathname.includes("/admin/orders")
    ? "/admin/orders"
    : pathname.includes("/admin/users")
    ? "/admin/users"
    : "/admin/products";

  const [queryValue, setQueryValue] = useState(searchParams.get("query") || "");

  useEffect(() => {
    setQueryValue(searchParams.get("query") || "");
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQueryValue(newValue);

    router.replace(`${formActionUrl}?query=${encodeURIComponent(newValue)}`);
  };

  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        name="query"
        value={queryValue}
        onChange={handleChange}
      />
    </div>
  );
}
