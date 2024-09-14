import { LoaderScreen } from "@/components/Loaders";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Images",
};

export default function LoadingPage() {
  return <LoaderScreen />;
}
