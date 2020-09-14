import { useEffect, useState } from "preact/hooks";
import { createContext } from "preact";

const AppContext = createContext({});
const LocalStateProvider = AppContext.Provider;

function AppStateProvider(props) {
  const [appState, setAppState] = useState({});

  useEffect(() => {
    async function fetchAnimista() {
      const blob = await fetch(
        "https://cors-anywhere.herokuapp.com/https://animista.net/animista.json",
        {
          headers: {
            "Content-Type": "application/json",
            Origin: "http://animista.net",
            Host: "animista.net",
          },
        }
      ).catch((err) => setAppState({ error: err }));

      const json = await blob.json();
      setAppState({ categories: json.categories });
    }

    fetchAnimista();
  }, []);

  return (
    <LocalStateProvider
      value={{
        appState,
      }}
    >
      {props.children}
    </LocalStateProvider>
  );
}

export { AppStateProvider, AppContext };
