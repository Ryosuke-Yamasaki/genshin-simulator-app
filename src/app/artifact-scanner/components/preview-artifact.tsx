import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { StarIcon } from "lucide-react";

const PreviewArtifact = () => {
  return (
    <Card className="w-80 bg-slate-100 dark:bg-slate-800 mx-auto h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-amber-600">
          Gladiator's Finale
        </CardTitle>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className="h-4 w-4 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-1">
            <div className="h-full w-full rounded-full bg-slate-100 dark:bg-slate-800" />
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Flower of Life
            </p>
            <p className="text-2xl font-bold">+20</p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="space-y-2">
          <div>
            <Badge variant="secondary" className="mb-1 font-normal">
              Main Stat
            </Badge>
            <p className="text-lg font-semibold">HP +4,780</p>
          </div>
          <div>
            <Badge variant="secondary" className="mb-1 font-normal">
              Sub Stats
            </Badge>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>CRIT Rate +3.9%</span>
                <span className="text-green-600 dark:text-green-400">+1</span>
              </li>
              <li className="flex justify-between">
                <span>ATK +5.8%</span>
                <span className="text-green-600 dark:text-green-400">+1</span>
              </li>
              <li className="flex justify-between">
                <span>Elemental Mastery +21</span>
              </li>
              <li className="flex justify-between">
                <span>Energy Recharge +6.5%</span>
                <span className="text-green-600 dark:text-green-400">+1</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreviewArtifact;
