import React from 'react';
import { renderWithRouterAndRedux } from "../tests/helpers/renderWithRouterAndRedux";
import Login from '../pages/Login';
import App from '../App';
import { fireEvent } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';

describe('Componente Login', () => {
    test('o componente deve renderizar com sucesso', () => {
        const { getByTestId } = renderWithRouterAndRedux(<Login />);

        expect(getByTestId("input-player-name")).toBeInTheDocument();
        expect(getByTestId("input-gravatar-email")).toBeInTheDocument();
        expect(getByTestId("btn-play")).toBeInTheDocument();
        expect(getByTestId("btn-settings")).toBeInTheDocument();
    })

    test('a validação do nome do jogador deve funcionar', () => {
        const { getByTestId } = renderWithRouterAndRedux(<Login />);

        const playerNameInput = getByTestId("input-player-name");
        const playButton = getByTestId("btn-play");

        fireEvent.change(playerNameInput, { target: { value: ' ' } });
        expect(playButton).toBeDisabled();

        fireEvent.change(playerNameInput, { target: { value: 'a' } });
        expect(playButton).toBeDisabled();
    });

    test("a validação de email funciona", () => {
      const { getByTestId } = renderWithRouterAndRedux(<Login />);

      const emailInput = getByTestId("input-gravatar-email");
      const playButton = getByTestId("btn-play");

      fireEvent.change(emailInput, { target: { value: "" } });
      expect(playButton).toBeDisabled();

      fireEvent.change(emailInput, { target: { value: "email" } });
      expect(playButton).toBeDisabled();

        fireEvent.change(emailInput, { target: { value: "email@" } });
        expect(playButton).toBeDisabled();       
    });

    test('Verifica se há um heading com o texto "Login"', () => {
      const { getByRole } = renderWithRouterAndRedux(<Login />);
      const heading = getByRole("heading", { name: /Login/i });
      expect(heading).toBeInTheDocument();
    });

    test("Verifica se há um campo para inserir o nome", () => {
      const { getByTestId } = renderWithRouterAndRedux(<Login />);
      const nameInput = getByTestId("input-player-name");
      expect(nameInput).toBeInTheDocument();
      expect(nameInput).toHaveAttribute("type", "text");
    });

    test("Verifica se há um campo para inserir o email", () => {
      const { getByTestId } = renderWithRouterAndRedux(<Login />);
      const emailInput = getByTestId("input-gravatar-email");
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute("type", "email");
    });

    test("Verifica se há um botão para jogar", () => {
      const { getByTestId } = renderWithRouterAndRedux(<Login />);
      const playButton = getByTestId("btn-play");
      expect(playButton).toBeInTheDocument();
      expect(playButton).toHaveAttribute("type", "submit");
      expect(playButton).toHaveAttribute("disabled");
    });

    test('Verifica se o botão "Jogar" é habilitado apenas quando o email e nome são válidos', () => {
      const { getByTestId } = renderWithRouterAndRedux(<Login />);
      const nameInput = getByTestId("input-player-name");
      const emailInput = getByTestId("input-gravatar-email");
      const playButton = getByTestId("btn-play");
      expect(playButton).toHaveAttribute("disabled");
      fireEvent.change(nameInput, {
        target: { name: "nameImput", value: "João" },
      });
      expect(playButton).toHaveAttribute("disabled");
      fireEvent.change(emailInput, {
        target: { name: "emailImput", value: "joao@gmail.com" },
      });
      expect(playButton).not.toHaveAttribute("disabled=''");
    });

    it("verifica a atualização do state apos o click do botão jogar", () => {
      const { getByTestId } = renderWithRouterAndRedux(<Login />);
      const nameInput = getByTestId("input-player-name");
      const emailInput = getByTestId("input-gravatar-email");
      const playButton = getByTestId("btn-play");

      fireEvent.change(nameInput, { target: { value: "Leonardo" } });
      fireEvent.change(emailInput, {
        target: { value: "leonardopestille@gmail.com" },
      });
      fireEvent.click(playButton);
      expect(nameInput).toHaveValue("Leonardo");
      expect(emailInput).toHaveValue("leonardopestille@gmail.com");
    });

    test('Verifica se ao clicar no botão de jogar, a rota é alterada', async () => {
      const { getByTestId, history } = renderWithRouterAndRedux(<Login />);
      const nameInput = getByTestId("input-player-name");
      const emailInput = getByTestId("input-gravatar-email");
      const playButton = getByTestId("btn-play");
      fireEvent.change(nameInput, {
        target: { name: "nameImput", value: "João" },
      });
      fireEvent.change(emailInput, {
        target: { name: "emailImput", value: "joao@gmail.com" },
      });
      expect(playButton).not.toHaveAttribute("disabled=''");
      fireEvent.click(playButton);
      await waitFor(() => expect(history.location.pathname).toBe("/"));
    });
    
    test("Verifica se há um botão para acessar as configurações", async () => {
      const { getByTestId, history } = renderWithRouterAndRedux(<App />);
      const settingsButton = getByTestId("btn-settings");
      expect(settingsButton).toBeInTheDocument();
      expect(settingsButton).toHaveAttribute("type", "button");
      fireEvent.click(settingsButton);
      await waitFor(
        () => {
          expect(history.location.pathname).toBe("/settings");
        },
        { timeout: 5000 }
      );
    });
});