import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const UserAvatar = ({
  avatarUrl,
  fallback,
}: {
  avatarUrl: string | null;
  fallback: string;
}) => {
  return (
    <Avatar className="aspect-square h-full w-full bg-primary">
      {avatarUrl && <AvatarImage src={avatarUrl} alt="User avatar" />}
      <AvatarFallback className="translate-y-[1px] bg-primary text-xl font-bold text-primary-foreground">
        {fallback.slice(0, 1).toLocaleUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
