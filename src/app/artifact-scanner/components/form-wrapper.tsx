import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FC, ReactNode } from "react";

interface FormWrapperProps {
  formTitle: string;
  children: ReactNode;
}

const FormWrapper: FC<FormWrapperProps> = ({ formTitle, children }) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{formTitle}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FormWrapper;
