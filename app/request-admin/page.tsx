"use client";

import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface FormData {
  from_name: string;
  email: string;
  message: string;
  access_key: string;
  subject: string;
  botcheck: boolean;
}

export default function RequestAdminForm() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<FormData>({
    mode: "onTouched",
  });

  const [isSuccess, setIsSuccess] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const userName = useWatch({
    control,
    name: "from_name",
    defaultValue: user?.name || "",
  });

  useEffect(() => {
    if (user) {
      setValue("from_name", user.name);
      setValue("email", user.email);
      setValue(
        "subject",
        `${user.name} sent a request to become a student_admin`
      );
    }
  }, [user, setValue]);

  useEffect(() => {
    setValue("subject", `${userName} sent a request to become a student_admin`);
  }, [userName, setValue]);

  const onSubmit = async (data: FormData, e?: React.BaseSyntheticEvent) => {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data, null, 2),
    })
      .then(async (response) => {
        const json = await response.json();
        if (json.success) {
          setIsSuccess(true);
          setMessage(json.message);
          toast({
            title: "Success",
            description: json.message,
            variant: "success",
          });
          if (e) {
            e.target.reset();
          }
          reset();
        } else {
          setIsSuccess(false);
          setMessage(json.message);
          toast({
            title: "Error",
            description: json.message,
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        setIsSuccess(false);
        setMessage("Client Error. Please check the console.log for more info");
        console.log(error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      });
  };

  if (!user || user.role !== "student") {
    return (
      <div className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              Only students can request to become student_admins.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Request Student Admin Role</CardTitle>
          <CardDescription>
            Submit a request to become a student admin. Please provide a reason
            for your request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitSuccessful && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input
                type="hidden"
                value="ce6d1708-9f8b-4922-9d84-e829101e2664"
                {...register("access_key")}
              />
              <input type="hidden" {...register("subject")} />
              <input
                type="checkbox"
                id=""
                className="hidden"
                style={{ display: "none" }}
                {...register("botcheck")}
              />

              <div>
                <Label htmlFor="from_name">Name</Label>
                <Input
                  id="from_name"
                  {...register("from_name", {
                    required: "Name is required",
                    maxLength: 80,
                  })}
                />
                {errors.from_name && (
                  <p className="text-red-600 text-sm">
                    {errors.from_name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Enter your email",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
                <p className="text-[10px] sm:text-[12px] text-orange-300 mt-1">
                  Please provide your primary email so that the Admin can
                  contact you when your role is updated to student_admin.
                </p>
              </div>

              <div>
                <Label htmlFor="message">Reason for Request</Label>
                <Textarea
                  id="message"
                  {...register("message", { required: "Enter your Message" })}
                  placeholder="Please explain why you want to become a student admin..."
                  rows={4}
                />
                {errors.message && (
                  <p className="text-red-600 text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          )}

          {isSubmitSuccessful && isSuccess && (
            <div className="text-center">
              <svg
                width="50"
                height="50"
                className="mx-auto text-green-500"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.6666 50L46.6666 66.6667L73.3333 33.3333M50 96.6667C43.8716 96.6667 37.8033 95.4596 32.1414 93.1144C26.4796 90.7692 21.3351 87.3317 17.0017 82.9983C12.6683 78.6649 9.23082 73.5204 6.8856 67.8586C4.54038 62.1967 3.33331 56.1283 3.33331 50C3.33331 43.8716 4.54038 37.8033 6.8856 32.1414C9.23082 26.4796 12.6683 21.3351 17.0017 17.0017C21.3351 12.6683 26.4796 9.23084 32.1414 6.88562C37.8033 4.5404 43.8716 3.33333 50 3.33333C62.3767 3.33333 74.2466 8.24998 82.9983 17.0017C91.75 25.7534 96.6666 37.6232 96.6666 50C96.6666 62.3768 91.75 74.2466 82.9983 82.9983C74.2466 91.75 62.3767 96.6667 50 96.6667Z"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
              <h3 className="text-xl mt-3 font-semibold">Success</h3>
              <p>{message}</p>
              <Button
                className="mt-4"
                onClick={() => router.push("/dashboard")}
              >
                Return to Dashboard
              </Button>
            </div>
          )}

          {isSubmitSuccessful && !isSuccess && (
            <div className="text-center">
              <svg
                width="50"
                height="50"
                className="mx-auto text-red-500"
                viewBox="0 0 97 97"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.9995 69C43.6205 53.379 52.3786 44.621 67.9995 29M26.8077 29L67.9995 69M48.2189 95C42.0906 95 36.0222 93.7929 30.3604 91.4477C24.6985 89.1025 19.554 85.6651 15.2206 81.3316C10.8872 76.9982 7.44975 71.8538 5.10454 66.1919C2.75932 60.53 1.55225 54.4617 1.55225 48.3333C1.55225 42.205 2.75932 36.1366 5.10454 30.4748C7.44975 24.8129 10.8872 19.6684 15.2206 15.3349C19.554 11.0015 24.6985 7.56401 30.3604 5.2188C36.0222 2.87358 42.0906 1.6665 48.2189 1.6665C60.5956 1.6665 72.4655 6.58316 81.2172 15.3349C89.9689 24.0866 94.8855 35.9565 94.8855 48.3333C94.8855 60.71 89.9689 72.58 81.2172 81.3316C72.4655 90.0833 60.5956 95 48.2189 95Z"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
              <h3 className="text-xl mt-3 font-semibold">Error</h3>
              <p>{message}</p>
              <Button className="mt-4" onClick={() => reset()}>
                Try Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
