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
import {Link} from "react-router"
import { useState } from "react"
import { toast } from "sonner"
import { useNavigate } from "react-router"
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate=useNavigate();
  const [form,setform]=useState({
    username:"",
    password:""
  })
  function handlechange(e:React.ChangeEvent<HTMLInputElement, HTMLInputElement>)
{
   setform({
    ...form,
    [e.target.name]:e.target.value
   })
}  
async function handlesubmit(e:React.SubmitEvent<HTMLFormElement>){
e.preventDefault();
const response=await fetch(`${import.meta.env.VITE_API_URL}/login`,{
  method:"POST",
  headers:{
    "content-type":"application/json"
  },
  credentials:"include",
  body:JSON.stringify(form)
});
const data=await response.json();
if(!response.ok){
toast.error(data.message,{position:"bottom-center"});
return;
}
toast.success(data.message,{position:"bottom-center"});
navigate("/dashboard");
}
return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 bg-neutral-900 font-[IM_Fell_DW_Pica_SC] text-white">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handlesubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email" className="text-white">Username</FieldLabel>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  onChange={handlechange}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-white">Password</FieldLabel>
                </div>
                <Input id="password" type="password" name="password" onChange={handlechange} required />
              </Field>
              <Field>
                <Button type="submit" className="bg-yellow-500">Login</Button>
              </Field>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link to="/" className="text-white hover:!text-yellow-500">Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/login-bg.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
