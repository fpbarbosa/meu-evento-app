import 'package:flutter/material.dart';

class AppTheme {
  static ThemeData theme = ThemeData(
    useMaterial3: true,

    // 🎨 Cores principais
    colorScheme: ColorScheme.fromSeed(
      seedColor: const Color(0xFF6A1B9A), // Roxo elegante
      primary: const Color(0xFF6A1B9A),
      secondary: const Color(0xFFFFC107), // Dourado
    ),

    // 🅰️ Fonte padrão
    fontFamily: 'Roboto',

    // 🔘 Estilo global dos botões
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFF6A1B9A),
        foregroundColor: Colors.white,
        padding: const EdgeInsets.symmetric(vertical: 14),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
    ),

    // ✏️ Inputs (TextField)
    inputDecorationTheme: InputDecorationTheme(
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    ),
  );
}
