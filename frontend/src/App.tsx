function App() {
  const authBtn = () => {
    return (
      <div>
        <button>login</button>
        <button>register</button>
      </div>
    );
  };

  return (
    <>
      <h1>Auth</h1>
      {authBtn()}
    </>
  );
}

export default App;
