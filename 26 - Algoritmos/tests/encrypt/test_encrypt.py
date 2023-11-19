from challenges.challenge_encrypt_message import encrypt_message
import pytest


def test_encrypt_message():
    # Teste com chave de tipo incorreto
    with pytest.raises(TypeError):
        encrypt_message("ditoso", "2")

    # Teste com mensagem vazia
    assert encrypt_message("", 2) == ""

    assert encrypt_message("hello", 10) == "olleh"

    # Teste com chave 0
    assert encrypt_message("ditoso", 0) == "osotid"

    # Teste com chave 1
    assert encrypt_message("ditoso", 1) == "d_osoti"

    # Teste com chave 2
    assert encrypt_message("ditoso", 2) == "osot_id"
