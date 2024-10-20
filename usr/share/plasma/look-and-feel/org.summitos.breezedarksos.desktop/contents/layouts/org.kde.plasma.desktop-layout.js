var panel = new Panel();
var panelScreen = panel.screen;

// Automatyczne wybieranie krawędzi dla panelu
// Panel automatycznie ustawi się na jednej z dostępnych krawędzi

// Ustawienie wysokości panelu
panel.height = 2 * Math.floor(gridUnit * 2.5 / 2);

// Ograniczenie poziomego panelu do maksymalnego rozmiaru monitora o proporcji 21:9
const maximumAspectRatio = 21 / 9;
if (panel.formFactor === "horizontal") {
    const geo = screenGeometry(panelScreen);
    const maximumWidth = Math.ceil(geo.height * maximumAspectRatio);

    if (geo.width > maximumWidth) {
        panel.alignment = "center";
        panel.minimumLength = maximumWidth;
        panel.maximumLength = maximumWidth;
    }
}

// Dodanie uruchamiacza Kickoff i ustawienie niestandardowej ikony
var kickoff = panel.addWidget("org.kde.plasma.kickoff");
kickoff.currentConfigGroup = ["Shortcuts"];
kickoff.writeConfig("global", "Alt+F1");  // Skrót do uruchamiacza

// Ustawienie niestandardowej ikony dla Kickoff
kickoff.currentConfigGroup = ["General"];
kickoff.writeConfig("useCustomButtonImage", "true");
kickoff.writeConfig("customButtonImage", "org.summitos.hello"); // Ścieżka do niestandardowej ikony

// Dodanie widgetów na panelu
panel.addWidget("org.kde.plasma.pager");

let taskBar = panel.addWidget("org.kde.plasma.icontasks");
taskBar.currentConfigGroup = ["General"];
taskBar.writeConfig("launchers", ["preferred://filemanager", "applications:org.kde.konsole.desktop", "preferred://browser"]);

panel.addWidget("org.kde.plasma.marginsseparator");

// Lista języków, które wyzwalają dodanie widgetu Input Method
var langIds = ["as", "bn", "bo", "brx", "doi", "gu", "hi", "ja", "kn", "ko", "kok", "ks", "lep", "mai", "ml", "mni", "mr", "ne", "or", "pa", "sa", "sat", "sd", "si", "ta", "te", "th", "ur", "vi", "zh_CN", "zh_TW"];

if (langIds.indexOf(languageId) != -1) {
    panel.addWidget("org.kde.plasma.kimpanel");
}

// Dodanie pozostałych widgetów
panel.addWidget("org.kde.plasma.systemtray");
panel.addWidget("org.kde.plasma.digitalclock");
panel.addWidget("org.kde.plasma.showdesktop");

