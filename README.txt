SUPER-KNACK – PWA-Version
=========================

Enthaltene Dateien:
  index.html                  – Spiel mit animierten Karten und Dropdown
  manifest.webmanifest        – PWA-Konfiguration
  service-worker.js           – Offline-Cache
  icons/                      – App-Icons

Installation / Nutzung:
1. Den gesamten Ordner auf einen HTTPS-Webserver hochladen (alle Dateien
   und Unterordner zusammenlassen).
2. index.html über HTTPS im Browser öffnen.
3. Im Browser über „App installieren“ oder „Zum Home-Bildschirm“ installieren.
4. Nach dem ersten erfolgreichen Öffnen über den Webserver funktioniert
   das Spiel auch ohne Internetverbindung.

Zum lokalen Testen (Python installiert):
  cd Super-Knack-PWA
  python -m http.server 8080
  Dann http://localhost:8080 im Browser öffnen.

Hinweis: Beim direkten Öffnen der HTML-Datei über file:// läuft das Spiel,
aber die PWA-Installation und der Service Worker benötigen HTTPS oder localhost.
