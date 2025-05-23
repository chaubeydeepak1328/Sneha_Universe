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