'use client'
import {Provider} from "react-redux";
import Questionaire from "./components/Questionaire";
import {questions} from "./data/questions";
import store from "./store/store";

export default function Home() {
  return (
    <main>
    <Provider store={store}>
      <div className="flex flex-col gap-2 items-center py-4">
        <Questionaire />
      </div>
    </Provider>
    </main>
  )
}
