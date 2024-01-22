import Header from "./Header";
import Main from "./Main";

export default function App() {
  return (
    <div className="app">
      <Header />

      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}
//pretend we are loading the quiz questions from somewhere. creating a
//fake API using an npm package called JSON server.
