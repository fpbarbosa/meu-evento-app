import 'package:flutter/material.dart';
import 'core/routes/app_router.dart';
import 'core/routes/app_routes.dart';
import 'core/theme/app_theme.dart';

void main() {
  runApp(const MeuEventoApp());
}

class MeuEventoApp extends StatelessWidget {
  const MeuEventoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Meu Evento App',
      debugShowCheckedModeBanner: false,

      // 🎨 Tema global do app
      theme: AppTheme.theme,

      // 🧭 Agora inicia pela Splash
      initialRoute: AppRoutes.splash,

      onGenerateRoute: AppRouter.generateRoute,
    );
  }
}
