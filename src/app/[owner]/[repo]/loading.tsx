import Image from "next/image";
import loader from "~/assets/loader.svg";

export default function Loader() {
    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
            }}
        >
            <Image
                src={loader as string}
                alt="loading"
                height={60}
                width={60}
            />
        </div>
    );
}
