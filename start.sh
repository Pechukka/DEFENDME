#!/bin/bash

echo "🚀 DefendMe Landing - Inicio Rápido"
echo "===================================="
echo ""

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado. Por favor instala Node.js primero."
    exit 1
fi

echo "📦 Instalando dependencias..."
npm install

echo ""
echo "✅ ¡Instalación completada!"
echo ""
echo "Para iniciar el servidor de desarrollo:"
echo "  npm run dev"
echo ""
echo "Para crear un build de producción:"
echo "  npm run build"
echo ""
echo "¡Listo para grabar tu demo! 🎥"
