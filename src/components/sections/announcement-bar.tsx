const messages = [
  "Complimentary worldwide shipping on orders above ₹2,999",
  "New Seasonal Collection — Now Available",
  "Members receive early access to exclusive drops",
];

export function AnnouncementBar() {
  return (
    <div className="bg-zinc-900 text-white py-2.5 px-4 text-center">
      <p className="text-xs tracking-widest uppercase text-zinc-300">
        {messages[0]}
      </p>
    </div>
  );
}
