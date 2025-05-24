import { BeatLoader } from "react-spinners";


export const removeAddress = () => {
    localStorage.removeItem('userData');
};

// export const setWalletAddress = (address) => {
//     localStorage.setItem('walletAdd', address);
// };


// export const getWalletAddress = () => {
//     return localStorage.getItem('walletAdd');
// }



export const Spinner = ({ loading }) => {
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };

    return (
        <div><BeatLoader
            color="#ffffff"
            loading={loading}
            cssOverride={override}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
        /></div>
    )
}


export const formatWithCommas = (value) => {
    const number = Number(value);
    if (isNaN(number)) return "0.000";
    return number.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
    });
};


export const handleCopy = (address) => {
    if (address) {
        navigator.clipboard.writeText(address);
        toast.success("Address copied to clipboard!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
};

