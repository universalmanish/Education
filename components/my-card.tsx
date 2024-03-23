import { Card } from "./ui/card"

export const MyCard = (label: string) => {
  return (
    <div>
        <Card>
          {label}
        </Card>
    </div>
  )
}