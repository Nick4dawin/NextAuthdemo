'use client'
import {BeatLoader} from 'react-spinners';
import CardWrapper from "./card-wrapper"
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect ,useState} from 'react';
import { newVerification } from '../../../actions/new-verifcation';
import FormError from '../form-error';
import FormSuccess from '../form-success';

const NewVerificationForm = () => {
    const [error,setError] = useState<string | undefined>('');
    const [success,setSuccess] = useState<string | undefined>('');
    const searchParams = useSearchParams();
    const token  = searchParams.get('token');
    const onSubmit = useCallback(() => {
        if(success || error) return;
        if(!token) {
            setError("Missing token!");
            return;
        }
        newVerification(token).then((data) => {
            setSuccess(data.success);
            setError(data.error);
            
        }).catch(()=>{
            setError("Something went wrong!");
        })
    },[token,success,error]
)

useEffect(() => {
    onSubmit();
},[onSubmit])
  return (
    <CardWrapper headerLabel="Confirming your Verification"
    backButtonHref="/auth/login"
    backButtonLabel="Back to Login">
        <div className="flex items-center w-full justify-center">
            {!success && !error && <BeatLoader color="#1e40af"/>}
            <FormSuccess message={success}/>
            {
                !success && (<FormError message={error === "Token does not exist!"?"Token does not exist: Note: If in Development, this issue may be caused by React Strict-Mode , Please try logging in, it shall work.":error}/>)
            }
            

        </div>
    </CardWrapper>
  )
}

export default NewVerificationForm
