import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-2xl border px-3 py-1 text-xs font-bold font-display transition-all duration-[250ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 shadow-sm hover:shadow-md",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-105",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105",
        outline: "border-border text-foreground hover:bg-accent hover:text-accent-foreground hover:scale-105",
        accent: "border-transparent bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105",
        success: "border-transparent bg-success text-success-foreground hover:bg-success/90 hover:scale-105",
        gaming: "border-transparent bg-gaming-primary text-white hover:shadow-glow hover:scale-110",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
