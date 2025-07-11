import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <div className="w-10/12 flex justify-start mt-56 ">
      <h2>This is the Home page</h2>
      <h1>{t("title")}</h1>
    </div>
  );
}
