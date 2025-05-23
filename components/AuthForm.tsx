"use client";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(5),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router=useRouter();
  const formSchema = authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        toast.success("Account created successfully.Please Sign in.");
        router.push('/sign-in')
        
      } else {
        toast.success("Signin successfully");
        router.push('/')
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  }

  const isSignIn = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px] ">
      <div className="flex flex-col gap-4 card pt-6 pb-10 px-10">
        <div className="flex flex-row gap-2 justify-center ">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100 text-2xl font-bold">InterviewPrep</h2>
        </div>
        <p className="text-center"> Practice Job Interviews with AI</p>{" "}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full mt-4 form"
          >
            {!isSignIn && (
              <FormField
                name="name"
                control={form.control}
                label="Name"
                placeholder="Enter Your name"
              />
            )}
            <FormField
                name="email"
                control={form.control}
                label="Email"
                placeholder="Enter Your Email"
              />
            <FormField
                name="password"
                control={form.control}
                label="Password"
                placeholder="Enter Your password"
                type="password"
              />
            <Button className="btn" type="submit">
              {isSignIn ? "Sign In " : "Sign Up"}
            </Button>
          </form>
        </Form>
        <p className="text-center text-[12px]">
          {isSignIn ? "No Account yet?" : "Already have an account?"}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "SignUp" : "SignIn"}
          </Link>
        </p>
      </div>
    </div>
  );
};
export default AuthForm;
