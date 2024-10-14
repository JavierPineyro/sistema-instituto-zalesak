import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { parseTotalToLocale } from "~/lib/utils";
import { service } from "~/server/services";

type PaymentCard = {
  id: number;
  recibo: {
    nameClient: string;
    concept: string | null;
    total: number;
  };
};
export default async function RecentPayments() {
  const payments = await service.pagos.getLastPayments(5);
  return (
    <div className="space-y-8">
      {payments.map((payment) => (
        <PaymentItem key={payment.id} payment={payment} />
      ))}
    </div>
  );
}

function PaymentItem({ payment }: { payment: PaymentCard }) {
  const letter = payment.recibo.nameClient.charAt(0).toUpperCase();
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src="/admin.png" alt="Avatar" />
        <AvatarFallback>{letter}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">
          {payment.recibo.nameClient}
        </p>
        <p className="text-muted-foreground text-sm">
          {payment.recibo.concept}
        </p>
      </div>
      <div className="ml-auto font-medium">
        +{parseTotalToLocale(payment.recibo.total)}
      </div>
    </div>
  );
}
