import React, { useEffect, useState } from "react";

function App() {
  const [hello, setHello] = useState<{ response: string } | null>(null);

  useEffect(() => {
    fetch("/api/hello")
      .then((response) => response.json())
      .then((data) => setHello(data));
  }, []);

  return (
    <div>
      <h1>Hello, Vite + sdisufihsffReact + TypeScript!</h1>
      <p>{hello?.response}</p>
    </div>
  );
}

export default App;
