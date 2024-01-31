import { toast } from "sonner";


const useFailedToast = () => {

    const failedToast = message => {
        toast.error(`${message}`);
    }

    return failedToast;

};

export default useFailedToast;