import json

# Ton HTML multi-lignes
html_content = """
<p>Dans un contexte où les petites et moyennes entreprises (PME) en Afrique doivent souvent gérer des ressources limitées et faire face à une forte incertitude, l’usage d’un <strong>dashboard</strong> (tableau de bord interactif) peut devenir un véritable levier de performance.</p>

<h2>1. Centraliser les informations clés</h2>
<p>Un dashboard regroupe en un seul écran les données essentielles : ventes, dépenses, stocks, trésorerie. Cela évite aux dirigeants de jongler entre plusieurs fichiers Excel et leur permet de prendre des décisions rapides.</p>
"""

# Ton objet JSON
data = {
    "id": "dashboard-pme-afrique",
    "title": "Pourquoi un dashboard peut transformer la gestion d’une PME en Afrique",
    "date": "28 Août 2025",
    "readingTime": "7 min de lecture",
    "tags": ["PME", "Afrique", "Gestion", "Data"],
    "content": html_content
}

# Conversion en JSON valide (avec échappement des sauts de ligne)
json_string = json.dumps(data, ensure_ascii=False, indent=2)

# Sauvegarde dans un fichier
with open("article.json", "w", encoding="utf-8") as f:
    f.write(json_string)

print("✅ JSON généré :")
print(json_string)

