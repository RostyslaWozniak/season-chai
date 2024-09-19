/* eslint-disable @next/next/no-img-element */
import { FormContainer } from "@/components/auth/FormContainer";
import SignUpForm from "@/components/auth/SignUpForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Page() {
  return (
    <main className="flex grow items-center justify-center px-2">
      <FormContainer
        title="Sign up"
        description="A place where even you can find a relax."
        linkLabel="Already have an account? Log in."
        href="/login"
        imageUrl="https://media.istockphoto.com/id/1297483389/photo/masala-tea-chai.jpg?s=612x612&w=0&k=20&c=Pv-QROSSywNh_qzHIIjHJeJB7OT0ujrKQsSiTgOmJAs="
      >
        <SignUpForm />
      </FormContainer>
    </main>
  );
}
