import { Banner, Fetcher, Layout } from "./components";

function App() {
  return (
    <div className="App">
      <Layout>
        <Banner/>
        <Fetcher/>
      </Layout>
    </div>
  );
}

export default App;
