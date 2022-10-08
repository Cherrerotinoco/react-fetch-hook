import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import useFetch from "../../index";

const App = () => {
  const defaultUrl = "https://swapi.dev/api/people/1";
  const [url, useUrl] = useState(defaultUrl);
  const [fetchUrl, useFetchUrl] = useState(defaultUrl);

  const { isLoading, data, error, abort } = useFetch(fetchUrl, {
    abortController: true,
  });

  const onSubmit = (event) => {
    console.log("Submitting...");
    useFetchUrl(event.target.url.value);

    event.preventDefault(); // 👈️ prevent page refresh
    console.log(abort);
    // 👇️ clear all input values in the form
    useUrl("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="url">URL to fetch:</label>
        <input
          id="url"
          type="text"
          name="url"
          onChange={(event) => useUrl(event.target.value)}
          placeholder={"Url to fetch"}
          value={url}
        />
        <button type="submit">Fecth Url</button>
      </form>
      <button onClick={() => abort()}>Abort</button>
      <p>isLoading: {(isLoading && "true") || "false"}</p>
      <p>Name: {data && data.name}</p>
    </div>
  );
};

if (root) {
  ReactDOM.render(<App />, document.getElementById("root"));
}
