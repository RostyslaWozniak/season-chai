/* eslint-disable @next/next/no-img-element */
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { TransitionLink } from "../TransitionLink";

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
    <AnimatePresence>
      <motion.div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-3">
            <h1 className="text-center text-3xl font-bold">
              {title} to Season Chai
            </h1>
            <p className="text-center text-muted-foreground">{description}</p>
          </div>
          <div className="space-y-5">
            {children}
            <TransitionLink
              href={href}
              className="block text-center hover:underline"
            >
              {linkLabel}
            </TransitionLink>
          </div>
        </div>
        <img
          src={imageUrl}
          alt=""
          className="hidden w-1/2 object-cover object-[10%] duration-300 md:block"
        />
      </motion.div>
    </AnimatePresence>
  );
};
