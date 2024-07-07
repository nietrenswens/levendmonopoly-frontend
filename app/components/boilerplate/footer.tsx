import Link from "next/link";

export default function Footer() {
  return (
    <div className="fixed bottom-0">
      <div className="ml-4 flex items-center justify-center w-full h-12">
        <p className="text-gray-400">
          Levend Monopoly by{" "}
          <Link
            href="https://renswens.nl"
            className="text-blue-400"
            target="_blank"
          >
            @nietrenswens
          </Link>
        </p>
      </div>
    </div>
  );
}
