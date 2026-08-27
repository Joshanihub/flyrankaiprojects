"use client";

import { useState } from "react";

export default function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notif, setNotif] = useState(false);

  function save() {
    if (name === "" || email === "") {
      alert("missing info");
      return;
    }
    alert("saved!");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Settings</h1>
      <div>
        <label>Name</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Notifications</label>
        <input type="checkbox" onChange={(e) => setNotif(e.target.checked)} />
      </div>
      <button onClick={save}>Save</button>
    </div>
  );
}
