"use client";

import { useEffect, useState } from "react";

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    fetch("/api/doctor/messages")
      .then((res) => res.json())
      .then(setMessages)
      .catch(() => undefined);
  }, []);

  const sendMessage = async () => {
    if (!draft.trim()) return;

    const res = await fetch("/api/doctor/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: draft }),
    });

    const data = await res.json();
    setMessages(data);
    setDraft("");
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <p className="text-sm uppercase tracking-[0.35em] text-teal-600">Communication</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Messages</h1>
        <p className="mt-3 text-slate-500">Hospital communication, ward updates, and care-team notes are now connected through the doctor API.</p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-900">Inbox</h2>
          <div className="mt-5 space-y-3">
            {messages.map((item) => (
              <article key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-slate-900">{item.sender}</h3>
                  <span className="text-xs text-slate-500">{item.time}</span>
                </div>
                <p className="mt-2 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-900">Send update</h2>
          <p className="mt-2 text-slate-500">Post a care note or operational update to the doctor message stream.</p>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={6}
            className="mt-5 w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-700 outline-none focus:border-teal-200 focus:bg-white"
            placeholder="Write a note for nurses, lab, or ward support..."
          />
          <button
            type="button"
            onClick={sendMessage}
            className="mt-4 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 px-5 py-3 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
          >
            Send Message
          </button>
        </article>
      </section>
    </div>
  );
}
