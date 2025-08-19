import Link from "next/link";

export default function NotFound() {
    return (
        <div className="py-24 text-center">
            <h2 className="text-2xl font-semibold">A projekt nem található</h2>
            <Link href="/#referenciak" className="mt-4 inline-block underline underline-offset-4">
                Vissza a referenciákhoz
            </Link>
        </div>
    );
}
