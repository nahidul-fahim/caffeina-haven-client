import { toast } from "sonner";


const useSuccessToast = () => {

    const successToast = message => {
        toast.success(`${message}`);
    }

    return successToast;

};

export default useSuccessToast;