import React from "react";
import Header from "./Header";
import TodoList from "./TodoList";
import TodoInputs from "./TodoInputs";

const App = () => {
  return (
    <main>
      <Header />
      <section className="bottom-container d-flex flex-column align-items-center justify-content-evenly">
        <TodoList />
        <TodoInputs />
      </section>
    </main>
  );
};

export default App;
