export function generateWhatsAppText(data: {
  machines: number;
  revenue: string;
  loss: string;
  recovery: string;
  net: string;
  payback: string;
}) {
  return `Doctor, based on our financial consultation today regarding your new dialysis center:

* Facility Scale:* ${data.machines} Machines
* Average Monthly Revenue:* ₹${data.revenue}
* Current Unrealized Loss:* ₹${data.loss}
* Recovered via AMC/Optimization:* +₹${data.recovery}
* Net Monthly Income:* ₹${data.net}
* Estimated Payback:* ${data.payback} months

This setup is highly financially viable with proper structuring. Let me know when you'd like to review the full Detailed Project Report.`;
}