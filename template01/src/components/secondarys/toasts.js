import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Toasts = (text, type) => {
    switch (type) {
        case 'success':
            toast.success(text, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            break;

        default:
            toast.error(text, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            break;
    }

}


export default Toasts

