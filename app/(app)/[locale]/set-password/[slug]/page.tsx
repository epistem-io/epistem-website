import AuthStep from "@/components/auth/AuthStep";
import SetPassword from "@/components/auth/SetPassword";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="min-h-screen bg-white lg:pt-22">
      <div className="grid min-h-screen grid-cols-1 px-4 py-6 lg:grid-cols-2 lg:gap-6 lg:p-6">
        <div className="hidden lg:block">
          <AuthStep />
        </div>
        <SetPassword slug={slug} />
      </div>
    </div>
  );
}
