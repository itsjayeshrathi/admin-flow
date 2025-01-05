import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
export function ForgotPassword() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full px-4 md:px-10 pt-10 bg-black">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>Enter Your Email</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Send Reset LInk
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
