'use client';
import Link from "next/link";

type Props = React.ComponentProps<typeof Link> & {
  as?: 'link' | 'button';
  children: React.ReactNode;
};

export default function BrandButton({ as = 'link', children, ...rest }: Props) {
  const cls = "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition shadow-sm " +
              "border-brand-accent text-white hover:opacity-95";
  const style = { background: "linear-gradient(90deg, #0A2A6A 0%, #00A3E0 100%)" };

  if (as === 'button') {
    // @ts-expect-error — allowing button props
    return <button className={cls} style={style} {...rest}>{children}</button>;
  }
  return <Link className={cls} style={style} {...rest}>{children}</Link>;
}