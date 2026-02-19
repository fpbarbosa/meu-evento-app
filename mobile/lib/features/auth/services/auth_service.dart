import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthService {
  static const String _baseUrl = 'http://localhost:3000';

  Future<void> login({
    required String email,
    required String password,
  }) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode != 200) {
      throw Exception('E-mail ou senha inválidos');
    }

    // 🔐 JWT será tratado no próximo passo
    final data = jsonDecode(response.body);
    final token = data['token'];

    if (token == null) {
      throw Exception('Token não retornado pelo servidor');
    }
  }
}
