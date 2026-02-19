import 'package:flutter/material.dart';
import '../services/auth_service.dart';

class LoginController extends ChangeNotifier {
  final AuthService _authService = AuthService();

  String _email = '';
  String _password = '';
  bool _isLoading = false;
  String? _error;

  // Getters
  bool get isLoading => _isLoading;
  String? get error => _error;

  // Setters
  void setEmail(String value) {
    _email = value;
  }

  void setPassword(String value) {
    _password = value;
  }

  Future<void> login() async {
    if (_isLoading) return;

    if (_email.isEmpty || _password.isEmpty) {
      _error = 'Preencha e-mail e senha';
      notifyListeners();
      return;
    }

    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await _authService.login(
        email: _email,
        password: _password,
      );

      // 👉 Aqui entra navegação futura (Home)
      debugPrint('Login realizado com sucesso');

    } catch (e) {
      _error = e.toString().replaceAll('Exception: ', '');
    }

    _isLoading = false;
    notifyListeners();
  }
}
