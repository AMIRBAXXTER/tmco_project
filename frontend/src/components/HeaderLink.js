"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LinkList() {
  const pathname = usePathname();

  const links = [
    { title: "صفحه اصلی", href: "/" },
    { title: "خدمات ما", href: "/services" },
    { title: "درباره ما", href: "/about" },
    { title: "تماس با ما", href: "/contact" },
    { title: "بلاگ", href: "/blog" },
  ];

  return (
    <>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-1 py-2 rounded-md transition  font-bold
                       ${isActive ? "text-[#3C9BD8]" : "text-white hover:text-[#c3dafd]"}`}
          >
            {link.title}
          </Link>
        );
      })}
    </>


  );
}
