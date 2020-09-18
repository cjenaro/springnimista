import { useEffect, useState } from "preact/hooks";
import { createContext } from "preact";

const AppContext = createContext(window.location);
const LocalStateProvider = AppContext.Provider;

function AppStateProvider(props) {
  const [, category, group, variation] = window.location.pathname.split("/");
  const [appState, set] = useState({ category, group, variation });

  const setAppState = (state) => {
    set({ ...appState, ...state });
  };

  useEffect(() => {
    async function fetchAnimista() {
      setAppState({ loading: true });
      const blob = await fetch(
        "https://cors-anywhere.herokuapp.com/https://animista.net/animista.json",
        {
          headers: {
            "Content-Type": "application/json",
            Origin: "http://animista.net",
            Host: "animista.net",
          },
        }
      ).catch((err) => setAppState({ error: err, loading: false }));

      const json = await blob.json();
      setAppState({ categories: json.categories, loading: false });
    }

    fetchAnimista();
  }, []);

  return (
    <LocalStateProvider
      value={{
        appState,
        setAppState,
      }}
    >
      {props.children}
    </LocalStateProvider>
  );
}

export { AppStateProvider, AppContext };
