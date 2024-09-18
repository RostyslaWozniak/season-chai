import { type Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";
import { FormContainer } from "@/components/auth/FormContainer";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page({
  searchParams,
}: {
  searchParams: { redirect: string | undefined };
}) {
  const redirect = searchParams.redirect;

  return (
    <main className="flex h-1 grow items-center justify-center">
      <FormContainer
        title="Login"
        description="A place where even you can find a relax."
        linkLabel="Don't have an account? Sign up"
        href={`/signup${redirect ? `?redirect=${redirect}` : ""}`}
        imageUrl="https://as2.ftcdn.net/v2/jpg/01/33/55/05/1000_F_133550552_BYYyjeY1E0F20LlgSyh0HTIQdofaV3XX.jpg"
      >
        <LoginForm />
      </FormContainer>
    </main>
  );
}
