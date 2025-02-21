"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Select a file first!");
    
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-xl font-bold">OAuth & File Upload</h1>

      {session ? (
        <>
          <p>Welcome, {session.user?.name}</p>
          <button onClick={() => signOut()} className="mt-4 p-2 bg-red-500 text-white">Sign Out</button>
        </>
      ) : (
        <button onClick={() => signIn("github")} className="mt-4 p-2 bg-blue-500 text-white">
          Sign in with GitHub
        </button>
      )}

      {session && (
        <>
          <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mt-4" />
          <button onClick={handleUpload} className="mt-2 p-2 bg-green-500 text-white">Upload File</button>
          {message && <p className="mt-2 text-red-500">{message}</p>}
        </>
      )}
    </div>
  );
}
