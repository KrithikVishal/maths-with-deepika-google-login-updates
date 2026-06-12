"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

export function ContactForm() {
  const [message, setMessage] = useState("");

  return (
    <form
      className="rounded-soft bg-white p-6 shadow-soft"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage("Thanks. We will get back to you soon.");
        event.currentTarget.reset();
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <input className="focus-ring rounded-2xl border border-borderSoft px-4 py-3" placeholder="Your name" required />
        <input className="focus-ring rounded-2xl border border-borderSoft px-4 py-3" placeholder="Phone or email" required />
      </div>
      <textarea className="focus-ring mt-4 min-h-36 w-full rounded-2xl border border-borderSoft px-4 py-3" placeholder="How can we help?" required />
      {message ? <p className="mt-4 rounded-2xl bg-gold/20 px-4 py-3 text-sm font-semibold text-blueDeep">{message}</p> : null}
      <Button className="mt-4">Send Message</Button>
    </form>
  );
}
