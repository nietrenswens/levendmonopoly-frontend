interface HeaderProps {
  isAdmin?: boolean;
}

export default function Header(props: HeaderProps) {
  return (
    <div className="bg-white p-4 drop-shadow-sm">
      <div className="flex space-x-2 lg:px-28 lg:text-left text-center font-bold">
        <h1>Levend Monopoly</h1>
        <p
          className={`text-xs text-red-400 ${
            props.isAdmin ? "inline" : "hidden"
          }`}
        >
          Admin
        </p>
      </div>
    </div>
  );
}
