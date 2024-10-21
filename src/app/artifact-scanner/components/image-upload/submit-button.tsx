import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "聖遺物をインポート中..." : "聖遺物をインポート"}
    </Button>
  );
};

export default SubmitButton;
