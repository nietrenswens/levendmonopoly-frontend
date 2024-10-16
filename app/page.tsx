import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { redirect } from "next/navigation";

export default function Page() {
  const SignIn = useSignIn();
  const authenticateTeam = (formData: FormData) => {
    // Validate info and retrieve token
    const token = "";
    if (
      SignIn({
        auth: {
          token: token,
          type: "Bearer",
        },
        userState: {},
      })
    ) {
      // Redirect to dashboard
      redirect("/player/dashboard");
    } else {
      // Show error
    }
  };
  return (
    <div className="w-full lg:grid lg:grid-cols-2 h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Inloggen</h1>
            <p className="text-balance text-muted-foreground">
              Vul jouw gegevens in om in te loggen
            </p>
          </div>
          <form action={authenticateTeam}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="wolf@mail.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Wachtwoord</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/bg.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
