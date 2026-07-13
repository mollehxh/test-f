import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type Props = {
  label: string;
  progress: number;
  onStop: () => void;
};

export function OperationStatusCard(props: Props) {
  const { label, progress, onStop } = props;

  return (
    <Card
      size="sm"
      className="mb-2 gap-3 rounded-lg bg-background px-3 py-3 ring-1 ring-sidebar-border"
    >
      <div className="flex min-w-0 items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={onStop}
          aria-label="Остановить операцию"
          className="shrink-0 rounded-full text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
        >
          <span aria-hidden="true" className="flex h-3 items-center gap-0.5">
            <span className="h-3 w-1 rounded-[1px] bg-current" />
            <span className="h-3 w-1 rounded-[1px] bg-current" />
          </span>
        </Button>
        <span className="min-w-0 flex-1 truncate text-xs font-medium">
          {label}
        </span>
        <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
          {progress}%
        </span>
      </div>
      <Progress
        value={progress}
        aria-label="Прогресс операции"
        className="gap-0 [&_[data-slot=progress-track]]:h-1"
      />
    </Card>
  );
}
