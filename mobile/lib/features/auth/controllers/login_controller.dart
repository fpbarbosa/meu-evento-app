import 'package:flutter/material.dart';

import '../../../core/routes/app_routes.dart';
import '../../../core/services/token_storage.dart';
import '../services/auth_service.dart';

class LoginController extends ChangeNotifier {
  final AuthService _authService = AuthService();
  final TokenStorage _tokenStorage = TokenStorage();

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

  Future<void> login(BuildContext context) async {
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
      final token = await _authService.login(
        email: _email,
        password: _password,
      );

      await _tokenStorage.saveToken(token);

      if (context.mounted) {
        Navigator.pushReplacementNamed(
          context,
          AppRoutes.home,
        );
      }
    } catch (e) {
      _error = e.toString().replaceAll('Exception: ', '');
    }

    _isLoading = false;
    notifyListeners();
  }
}
