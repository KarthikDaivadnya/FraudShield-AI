export default function Footer() {
  return (
    <footer className="border-t border-ledger-700/70 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 text-center">
        <p className="font-mono text-[11px] text-ledger-500">
          FraudShield AI — Random Forest classifier trained on simulated mobile-money transactions.
        </p>
        <p className="text-[11px] text-ledger-600">
          Probabilities are model estimates, not certainties. Route HIGH and MEDIUM risk
          transactions to manual review.
        </p>
      </div>
    </footer>
  );
}
