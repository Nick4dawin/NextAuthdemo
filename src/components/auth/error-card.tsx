
import CardWrapper from "./card-wrapper"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
const ErrorCard = () => {
  return (
    <CardWrapper headerLabel="Oops,Something went wrong" backButtonLabel="Back to Login" backButtonHref="/auth/login">
        <div className="w-full items-center flex justify-center">

        <ExclamationTriangleIcon className="text-destructive"/>
        </div>
    </CardWrapper>
    // <Card className="w-[400px] shadow-md">
    //     <CardHeader>
    //         <Header label="Oops,Something went wrong"/>
    //     </CardHeader>
    //     <CardFooter>
    //         <BackButtton label="Back to Login" href="/auth/login"/>
    //     </CardFooter>
    // </Card>
  )
}

export default ErrorCard
