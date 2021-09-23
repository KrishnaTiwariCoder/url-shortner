import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

function App() {
  const [link, setLink] = useState("");
  const [output, setOutput] = useState(null);

  const shortUrl = () => {
    if (!link) {
      return toast.error("Link not valid");
    }
    axios
      .post("http://localhost:5000/url/create", {
        url: link,
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Copy url ");
          setOutput(res.data.shortUrl);
        }
      })
      .catch((error) => {
        return toast.error("Url not valid !!");
      });
  };
  return (
    <>
      <div className="App">
        <h1>Shorten your urls - In clicks</h1>
        <div className="card">
          <div className="input">
            <h3>Paste your link here :-</h3>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="btn">
            <button onClick={shortUrl}>Create short url</button>
          </div>
          <div className="output">
            {output && (
              <>
                <a href={output} target="_blank" rel="noreferrer">
                  {output}
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(output);
                    toast.success("Copied to clipboard !!");
                  }}
                >
                  Copy short url
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
