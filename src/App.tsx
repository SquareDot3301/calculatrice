import { createSignal, type Component, Show, onMount } from "solid-js";

const [result, setResult] = createSignal(0);
const [operator, setOperator] = createSignal("");
const [firstNumber, setFirstNumber] = createSignal(0);
const [secondNumber, setSecondNumber] = createSignal(0);
const [error, setError] = createSignal("");
const [showPopUpFirstNumber, setShowPopUpFirstNumber] = createSignal(false);
const [showPopUpSecondNumber, setShowPopUpSecondNumber] = createSignal(false);
const [render, setRender] = createSignal();

const renderResult = (): void => {
  if (
    firstNumber() === 0 &&
    operator() === "" &&
    secondNumber() === 0 &&
    result() === 0
  ) {
    setRender("");
  } else if (
    firstNumber() !== 0 &&
    operator() === "" &&
    secondNumber() === 0 &&
    result() === 0
  ) {
    setRender(firstNumber());
  } else if (
    firstNumber() !== 0 &&
    operator() !== "" &&
    secondNumber() === 0 &&
    result() === 0
  ) {
    setRender(firstNumber() + operator());
  } else if (
    firstNumber() !== 0 &&
    operator() !== "" &&
    secondNumber() !== 0 &&
    result() === 0
  ) {
    setRender(firstNumber() + operator() + secondNumber());
  } else if (
    firstNumber() !== 0 &&
    operator() !== "" &&
    secondNumber() !== 0 &&
    result() !== 0
  ) {
    setRender(firstNumber() + operator() + secondNumber() + " = " + result());
  }
};

const reset = (): void => {
  setFirstNumber(0);
  setSecondNumber(0);
  setOperator("");
  setShowPopUpFirstNumber(false);
  setShowPopUpSecondNumber(false);
  setResult(0);
  setError("");
  renderResult();
};

const number = (number: number): void => {
  renderResult();
  setShowPopUpFirstNumber(false);
  setShowPopUpSecondNumber(false);
  if (firstNumber() !== 0) {
    renderResult();
    if (operator() !== "") {
      if (secondNumber() !== 0) {
        renderResult();
        setShowPopUpSecondNumber(true);
        renderResult();
      } else {
        setSecondNumber(number);
        renderResult();
      }
    } else {
      setShowPopUpFirstNumber(true);
      renderResult();
    }
  } else {
    setFirstNumber(number);
    renderResult();
  }
};

const resultFunc = (): void => {
  setShowPopUpFirstNumber(false);
  setShowPopUpSecondNumber(false);
  if (operator() === "+") {
    const resultat: number = firstNumber() + secondNumber();
    setResult(resultat);
    setError("");
  } else if (operator() === "-") {
    const resultat: number = firstNumber() - secondNumber();
    setResult(resultat);
    setError("");
  } else if (operator() === "/") {
    if (secondNumber() === 0) {
      setError("Vous ne pouvez pas diviser par 0!");
    } else {
      const resultat: number = firstNumber() / secondNumber();
      setResult(resultat.toFixed(2));
      setError("");
    }
  } else if (operator() === "*") {
    const resultat: number = firstNumber() * secondNumber();
    setResult(resultat.toFixed(2));
    setError("");
  } else {
    setError("Vous n'avez pas indiqué d'opérateur!");
  }
};

const App: Component = () => {
  const onInputChangeFirstNumber = (e: any): void => {
    setFirstNumber(e.target.value);
    renderResult();
  };

  const onInputChangeSecondNumber = (e: any): void => {
    setSecondNumber(e.target.value);
    renderResult();
  };

  onMount(() => {
    renderResult();
  });

  return (
    <div class="flex justify-center items-center h-screen">
      <div class="border rounded-md w-1/2 p-4 m-5">
        <Show when={error() !== ""}>
          <div
            onclick={() => {
              reset();
            }}
            class="mx-auto hover:cursor-pointer text-center bg-red-500 text-white text-3xl w-1/2 p-2 rounded-md shadow-lg duration-300 shadow-red-300 hover:shadow-red-900"
          >
            {error()}
          </div>
        </Show>
        <div class="flex justify-center">
          <Show when={showPopUpFirstNumber() === true}>
            <form action="">
              <label class="mx-3" for="number">
                Entrez votre nombre :
              </label>
              <input
                class="p-1 m-2 border-slate-500 border text-white bg-slate-800 rounded-md active:border-teal-500"
                onInput={onInputChangeFirstNumber}
                value={firstNumber()}
                type="number"
                name="number"
                id="number"
              />
              <button
                class="border rounded-md border-orange-400 p-2 m-3 bg-orange-600 shadow-lg shadow-orange-500 duration-300 text-white hover:shadow-orange-900"
                onclick={() => {
                  setShowPopUpFirstNumber(false);
                }}
              >
                OK
              </button>
            </form>
          </Show>
          <Show when={showPopUpSecondNumber() === true}>
            <form action="">
              <label class="mx-3" for="number">
                Entrez votre nombre :
              </label>
              <input
                class="p-1 m-2 border-slate-500 border text-white bg-slate-800 rounded-md active:border-teal-500"
                onInput={onInputChangeSecondNumber}
                value={secondNumber()}
                type="number"
                name="number"
                id="number"
              />
              <button
                class="border rounded-md border-orange-400 p-2 m-3 bg-orange-600 shadow-lg shadow-orange-500 duration-300 text-white hover:shadow-orange-900"
                onclick={() => {
                  setShowPopUpSecondNumber(false);
                }}
              >
                OK
              </button>
            </form>
          </Show>
        </div>
        <div class="flex justify-center">
          <div class="m-5 bg-slate-800 md:h-20 rounded-md border w-11/12 sm:w-2/3 lg:w-1/2 text-center text-white p-3 md:p-5 text-2xl md:text-4xl">
            {render()}
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 w-full">
          <button
            class="border rounded-md mx-auto border-orange-400 p-2 w-1/3 m-3 bg-orange-600 shadow-lg shadow-orange-500 duration-300 text-white hover:shadow-orange-900"
            onclick={() => {
              number(7);
            }}
          >
            7
          </button>
          <button
            class="border rounded-md mx-auto border-orange-400 p-2 w-1/3 m-3 bg-orange-600 shadow-lg shadow-orange-500 duration-300 text-white hover:shadow-orange-900"
            onclick={() => {
              number(8);
            }}
          >
            8
          </button>
          <button
            class="border rounded-md mx-auto border-orange-400 p-2 w-1/3 m-3 bg-orange-600 shadow-lg shadow-orange-500 duration-300 text-white hover:shadow-orange-900"
            onclick={() => {
              number(9);
            }}
          >
            9
          </button>
          <button
            class="border rounded-md mx-auto border-orange-400 p-2 w-1/3 m-3 bg-orange-600 shadow-lg shadow-orange-500 duration-300 text-white hover:shadow-orange-900"
            onclick={() => {
              setOperator("/");
              renderResult();
              setShowPopUpFirstNumber(false);
              setShowPopUpSecondNumber(false);
            }}
          >
            /
          </button>
          <button
            class="border rounded-md mx-auto border-orange-400 p-2 w-1/3 m-3 bg-orange-600 shadow-lg shadow-orange-500 duration-300 text-white hover:shadow-orange-900"
            onclick={() => {
              number(4);
            }}
          >
            4
          </button>
          <button
            class="border rounded-md mx-auto border-orange-400 p-2 w-1/3 m-3 bg-orange-600 shadow-lg shadow-orange-500 duration-300 text-white hover:shadow-orange-900"
            onclick={() => {
              number(5);
            }}
          >
            5
          </button>
          <button
            class="border rounded-md mx-auto border-orange-400 p-2 w-1/3 m-3 bg-orange-600 shadow-lg shadow-orange-500 duration-300 text-white hover:shadow-orange-900"
            onclick={() => {
              number(6);
            }}
          >
            6
          </button>
          <button
            class="border rounded-md mx-auto border-orange-400 p-2 w-1/3 m-3 bg-orange-600 shadow-lg shadow-orange-500 duration-300 text-white hover:shadow-orange-900"
            onclick={() => {
              setOperator("*");
              renderResult();
              setShowPopUpFirstNumber(false);
              setShowPopUpSecondNumber(false);
            }}
          >
            *
          </button>
          <button
            class="border rounded-md mx-auto border-orange-400 p-2 w-1/3 m-3 bg-orange-600 shadow-lg shadow-orange-500 duration-300 text-white hover:shadow-orange-900"
            onclick={() => {
              number(1);
            }}
          >
            1
          </button>
          <button
            class="border rounded-md mx-auto border-orange-400 p-2 w-1/3 m-3 bg-orange-600 shadow-lg shadow-orange-500 duration-300 text-white hover:shadow-orange-900"
            onclick={() => {
              number(2);
            }}
          >
            2
          </button>
          <button
            class="border rounded-md mx-auto border-orange-400 p-2 w-1/3 m-3 bg-orange-600 shadow-lg shadow-orange-500 duration-300 text-white hover:shadow-orange-900"
            onclick={() => {
              number(3);
            }}
          >
            3
          </button>
          <button
            class="border rounded-md mx-auto border-orange-400 p-2 w-1/3 m-3 bg-orange-600 shadow-lg shadow-orange-500 duration-300 text-white hover:shadow-orange-900"
            onclick={() => {
              setOperator("+");
              renderResult();
              setShowPopUpFirstNumber(false);
              setShowPopUpSecondNumber(false);
            }}
          >
            +
          </button>
          <button
            class="border rounded-md mx-auto border-red-400 p-2 w-1/3 m-3 bg-red-600 shadow-lg shadow-red-500 duration-300 text-white hover:shadow-red-900"
            onclick={() => {
              reset();
            }}
          >
            X
          </button>
          <button
            class="border rounded-md mx-auto border-orange-400 p-2 w-1/3 m-3 bg-orange-600 shadow-lg shadow-orange-500 duration-300 text-white hover:shadow-orange-900"
            onclick={() => {
              number(0);
            }}
          >
            0
          </button>
          <button
            class="border rounded-md mx-auto border-orange-400 p-2 w-1/3 m-3 bg-orange-600 shadow-lg shadow-orange-500 duration-300 text-white hover:shadow-orange-900"
            onclick={() => {
              number(3.14);
            }}
          >
            pi
          </button>
          <button
            class="border rounded-md mx-auto border-orange-400 p-2 w-1/3 m-3 bg-orange-600 shadow-lg shadow-orange-500 duration-300 text-white hover:shadow-orange-900"
            onclick={() => {
              setOperator("-");
              renderResult();
              setShowPopUpFirstNumber(false);
              setShowPopUpSecondNumber(false);
            }}
          >
            -
          </button>
          <button
            class="border rounded-md mx-auto border-teal-400 p-2 w-1/3 m-3 bg-teal-600 shadow-lg shadow-teal-500 duration-300 text-white hover:shadow-teal-900"
            onclick={() => {
              renderResult();
              resultFunc();
              renderResult();
            }}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
