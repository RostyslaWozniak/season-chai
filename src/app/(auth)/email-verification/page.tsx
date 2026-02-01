import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { SectionWrapper } from "@/components/section-wrapper";
import { FormWrapper } from "@/features/auth/components/form-wrapper";
import { VerificationCodeForm } from "@/features/auth/components/verification-code-form";
import { notFound } from "next/navigation";
import z from "zod";

export default async function EmailVerificationPage({
  searchParams,
}: {
  searchParams: Promise<{ verificationToken: string }>;
}) {
  const { verificationToken } = await searchParams;

  if (!verificationToken) return notFound();
  const { success } = z.uuid().safeParse(verificationToken);
  return (
    <>
      <SectionWrapper>
        <MaxWidthWrapper>
          <FormWrapper
            title="Werefikacja E-mail"
            description="Proszę wpisać kod weryfikacyjny z wiadomości e-mail, którą do Ciebie wysłaliśmy"
            error={success ? undefined : "Nieprawidłowy token weryfikacyjny"}
            // link={{ href: "/", label: "Nie dostałeś email?" }}
          >
            {success && (
              <VerificationCodeForm verificationToken={verificationToken} />
            )}
          </FormWrapper>
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
