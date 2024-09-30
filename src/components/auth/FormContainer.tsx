/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { motion } from "framer-motion";

type FormContainerProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  href: string;
  imageUrl: string;
  linkLabel: string;
};

export const FormContainer = ({
  children,
  title,
  description,
  href,
  imageUrl,
  linkLabel,
}: FormContainerProps) => {
  return (
    <div className="flex max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card md:shadow-2xl">
      <div className="mx-auto w-full max-w-[400px] space-y-10 overflow-y-auto px-5 md:w-1/2 md:py-10">
        <div className="space-y-3">
          <h1 className="text-center text-2xl font-bold md:text-3xl">
            {title} to <span className="text-primary">Season Chai</span>
          </h1>
          <p className="text-center text-sm text-muted-foreground md:text-base">
            {description}
          </p>
        </div>
        <div className="space-y-5">
          {children}
          <Link href={href} className="block text-center hover:underline">
            {linkLabel}
          </Link>
        </div>
      </div>
      <div className="hidden aspect-[9/10] w-1/2 bg-gray-300 duration-300 md:block">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={imageUrl}
          className="h-full w-full object-cover object-[10%]"
          alt="nice tea image"
          loading="lazy"
        />
      </div>
    </div>
  );
};
