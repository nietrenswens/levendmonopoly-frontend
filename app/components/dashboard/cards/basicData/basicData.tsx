import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Club, DollarSign, Users } from "lucide-react";

interface BasicDataProps {
  title: string;
  data: string;
  footer?: string;
  icon: "building" | "money" | "people" | "chance";
  className?: string;
}

export default function BasicData(props: BasicDataProps) {
  let icon: React.ReactNode;
  switch (props.icon) {
    case "building":
      icon = <Building />;
      break;
    case "money":
      icon = <DollarSign />;
      break;
    case "people":
      icon = <Users />;
      break;
    case "chance":
      icon = <Club />;
      break;
  }
  return (
    <Card className={"h-32 w-full min-w-48 " + props.className}>
      <CardHeader className="pb-2">
        <CardTitle className="flex flex-row items-center justify-between space-y-0">
          <h3 className="tracking-tight text-sm font-medium">{props.title}</h3>
          {icon}
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-8 pt-0">
        <p className="text-2xl font-bold">{props.data}</p>
        <p className="text-xs text-muted-foreground">{props.footer}</p>
      </CardContent>
    </Card>
  );
}
