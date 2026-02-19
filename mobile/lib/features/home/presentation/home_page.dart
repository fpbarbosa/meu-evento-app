import 'package:flutter/material.dart';
import '../../../core/services/token_storage.dart';
import '../../../core/routes/app_routes.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final tokenStorage = TokenStorage();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            tooltip: 'Sair',
            onPressed: () async {
              await tokenStorage.clearToken();

              if (context.mounted) {
                Navigator.pushReplacementNamed(
                  context,
                  AppRoutes.login,
                );
              }
            },
          ),
        ],
      ),
      body: const Center(
        child: Text(
          'Usuário autenticado 🚀',
          style: TextStyle(fontSize: 20),
        ),
      ),
    );
  }
}
