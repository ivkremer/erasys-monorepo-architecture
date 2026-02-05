import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Gallery } from './components/Gallery/Gallery';

function App() {
  return (
    <>
      <Header />
      <main className="w-full max-w-7xl mx-auto px-4 mt-6 flex flex-col flex-grow-1">
        <h1>Erasys Monorepo Architecture</h1>
        <div className="flex-grow-1 mt-2">
          <Gallery />
        </div>
        <div className="my-4">
          <hr className="shadow-xs shadow-shadow mt-2" />
          <Footer />
        </div>
      </main>
    </>
  );
}

export default App;
