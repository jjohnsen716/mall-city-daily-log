"use client";

import { useState } from "react";

export default function DailyLog() {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    date: today,
    job: "",
    foreman: "",
    crew: "",
    work: "",
    issues: "",
    safety: "",
  });

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

async function submitLog(e) {
  e.preventDefault();

  const res = await fetch("/api/send-log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (res.ok) {
    alert("Daily Log submitted and emailed successfully.");
  } else {
    alert("There was an error sending the daily log.");
  }
}


  return (
    <main style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <h1>Mall City Mechanical</h1>
      <h2>Daily Job Log</h2>

      <form onSubmit={submitLog}>
        <label>Date</label>
        <input type="date" name="date" value={form.date} onChange={updateField} />


  <label>Job Name & Job Number</label>
<input
  name="job"
  placeholder="Example: St. Mary’s Hospital – Job #24-017"
  value={form.job}
  onChange={updateField}
  required
/>


        <label>Foreman Name</label>
        <input name="foreman" value={form.foreman} onChange={updateField} required />

        <label>Crew Size</label>
        <input name="crew" type="number" value={form.crew} onChange={updateField} />

        <label>Work Performed</label>
        <textarea name="work" value={form.work} onChange={updateField} rows={4} />

        <label>Issues / Delays</label>
        <textarea name="issues" value={form.issues} onChange={updateField} rows={3} />

        <label>Safety Notes</label>
        <textarea name="safety" value={form.safety} onChange={updateField} rows={3} />

        <button type="submit" style={{ marginTop: 15 }}>
          Submit Daily Log
        </button>
      </form>

      <style jsx>{`
        label {
          display: block;
          margin-top: 12px;
          font-weight: bold;
        }
        input, textarea {
          width: 100%;
          padding: 8px;
          margin-top: 4px;
        }
        button {
          padding: 10px 16px;
          font-size: 16px;
        }
      `}</style>
    </main>
  );
}
