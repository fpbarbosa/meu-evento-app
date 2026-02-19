import 'package:flutter/material.dart';

class LoginController extends ChangeNotifier {
  String email = '';
  String password = '';
  bool isLoading = false;
  String? error;

  void setEmail(String value) {
    email = value;
  }

  void setPassword(String value) {
    password = value;
  }

  Future<void> login() async {
    error = null;

    if (email.isEmpty || password.isEmpty) {
      error = 'Preencha todos os campos';
      notifyListeners();
      return;
    }

    isLoading = true;
    notifyListeners();

    // Simula chamada de API
    await Future.delayed(const Duration(seconds: 2));

    isLoading = false;

    // Simulação de erro/sucesso
    if (email != 'demo@email.com' || password != '123456') {
      error = 'Email ou senha inválidos';
    }

    notifyListeners();
  }
}
