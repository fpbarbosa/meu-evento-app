import 'package:flutter/material.dart';

import '../../../core/routes/app_routes.dart';
import '../../../core/services/token_storage.dart';
import '../services/auth_service.dart';

class LoginController extends ChangeNotifier {
  final AuthService _authService = AuthService();
  final TokenStorage _tokenStorage = TokenStorage();

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

  Future<void> login(BuildContext context) async {
    error = null;

    if (email.isEmpty || password.isEmpty) {
      error = 'Preencha todos os campos';
      notifyListeners();
      return;
    }

    isLoading = true;
    notifyListeners();

    try {
      final token = await _authService.login(
        email: email,
        password: password,
      );

      await _tokenStorage.saveToken(token);

      if (context.mounted) {
        Navigator.pushReplacementNamed(
          context,
          AppRoutes.home,
        );
      }
    } catch (e) {
      error = e.toString().replaceAll('Exception: ', '');
    }

    isLoading = false;
    notifyListeners();
  }
}
