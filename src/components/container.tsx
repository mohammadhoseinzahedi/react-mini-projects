import { cn } from "@/lib/utils";
const Container = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("container mx-auto px-4 md:px-8", className)}>
      {children}
    </div>
  );
};

export default Container;
