import Image from 'next/image'
import SignIn from "@/app/components/SignIn";
import SignUp from "@/app/components/SignUp";
import BusForm from "@/app/components/BusForm";

export default function Home() {
  return (
      <main>
        <BusForm/>


          {/*<section>*/}
          {/*    <h1 className={"justify-center flex"}>Firebase Auth and Context</h1>*/}
          {/*    <SignIn/>*/}
          {/*    <SignUp/>*/}
          {/*</section>*/}
      </main>

  )
}
