import PageHero from "@/components/PageHero";

type Props = {
  title: string;
  intro?: string;
  /** Override image if needed later */
  imageSrc?: string;
};

export default function InvestorsHero({
  title,
  intro,
  imageSrc = "/images/branding/blue-c.png",
}: Props) {
  return (
    <PageHero
      mode="contain"
      size="compact"
      imageSrc={imageSrc}
      imageAlt={`Investors — ${title}`}
      title={title}
      intro={intro}
    />
  );
}