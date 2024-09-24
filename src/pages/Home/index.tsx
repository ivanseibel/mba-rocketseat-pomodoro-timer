import { Play } from "phosphor-react";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  Separator,
} from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">I'm going to work on</label>
          <input type="text" id="task" />

          <label htmlFor="minutesAmount">for</label>
          <input type="number" id="minutesAmount" />

          <span>minutes</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <button type="submit">
          <Play size={24} />
          Start
        </button>
      </form>
    </HomeContainer>
  );
}
