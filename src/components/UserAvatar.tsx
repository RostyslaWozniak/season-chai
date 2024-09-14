import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const UserAvatar = ({
  avatarUrl,
  fallback,
}: {
  avatarUrl: string | null;
  fallback: string;
}) => {
  return (
    <Avatar className="aspect-square h-full">
      {avatarUrl && <AvatarImage src={avatarUrl} alt="User avatar" />}
      <AvatarFallback className="bg-card text-xl font-bold">
        {fallback.slice(0, 1).toLocaleUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
