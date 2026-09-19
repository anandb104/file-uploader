import { cn } from "cn"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {Link} from "react-router"
import { useState } from "react"
import { useNavigate } from "react-router"
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate=useNavigate();
  const [data,setdata]=useState({
    fullname:"",
    username:"",
    password:"",
    confirmpassword:"",
  })
  
   function handlechange(e:React.ChangeEvent<HTMLInputElement, HTMLInputElement>){
    setdata(
      {
        ...data,
        [e.target.name]:e.target.value
      }
    )
   }
   async function handlesubmit(e:React.SubmitEvent<HTMLFormElement>){
    e.preventDefault();
    const response=await fetch(`${import.meta.env.VITE_API_URL}/signup`,{
      method:"POST",
      headers:{
        "content-type":"application/json",
      },
      credentials:"include",
      body:JSON.stringify(data)
    })
    const form=await response.json();
    console.log(form);
    if(!response.ok){
      if(form.message)
     toast.error(form.message,{ position: "bottom-center"});
    else if(form.errors){
      form.errors.forEach((error) => {
        toast.error(error.msg,{ position: "bottom-center"})
      });
    }
    return;
    }
    toast.success(form.message,{ position: "bottom-center"});
    navigate("/dashboard");
   }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 bg-neutral-900 font-[IM_Fell_DW_Pica_SC]">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handlesubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold text-white">Create your account</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Enter your Username below to create your account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="username" className="text-white">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="mb103"
                  onChange={handlechange}
                  className="text-white"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="fullname" className="text-white">Fullname</FieldLabel>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Enter Your Full name"
                  name="fullname"
                  className="text-white"
                  onChange={handlechange}
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password" className="text-white">Password</FieldLabel>
                    <Input id="password" type="password" name="password" onChange={handlechange} className="text-white" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password" className="text-white">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" name="confirmpassword" onChange={handlechange} className="text-white" required />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" className="bg-yellow-500">Create Account</Button>
              </Field>
              <FieldDescription className="text-center">
                Already have an account? <Link to="/login" className="text-white hover:!text-yellow-500">Sign in</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/signup-bg.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
