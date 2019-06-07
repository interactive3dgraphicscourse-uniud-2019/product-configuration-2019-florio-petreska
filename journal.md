## 05/06/2019
### Idea
Abbiamo deciso di sviluppare la pagina di presentazione dell'ACMEpad un tablet con cornice e scocca personalizzabili con diverse combinazioni di materiali.

Il tablet ha anche un logo inciso sul retro, fatto di materiale metallico (simile alla mela Apple) e ci piacerebbe realizzare anche quello e far scegliere agli utenti tra diverse figure da incidere.

### Interfaccia
Abbiamo visitato qualche sito di elettronica e in particolare i siti Samsung e Apple per ispirarci nella progettazione dell'interfaccia.

![](images/ipad.png)
![](images/samsung_tablet.png)

A questo punto abbiamo preparato uno sketch a mano con le posizioni dei principali elementi nella pagina e abbiamo concluso la progettazione con un mockup realizzato tramite il sito moqups (https://app.moqups.com/yV5e9Sb7Y0/view/page/a1bb9397e?ui=0)

![](images/sketch-interface.jpeg)
![](images/mockup.png)

Il focus della pagina deve essere il configuratore, dunque ci concentreremo inizialmente sulla realizzazione della parte alta della pagina.

![](images/mockup-displaysize.png)

### Suddivisione del lavoro
Abbiamo deciso di iniziare con lo sviluppo di una semplice pagina web, per poi passare agli script veri e propri.

Inizialmente ci concentreremo su due materiali per la cornice e due materiali per la scocca.

Per quanto riguarda il modello 3D, utilizzeremo un modello creato da noi utilizzando Blender.

### Implementazione logo
Abbiamo fatto più versioni di design del logo. Il logo principale contiene una singola lettera "A" e il nome dell'azienda ACME. 
L'intero logo sarà usato nel titolo della pagina principale e invece la singola lettera ci piacerebbe usarla come logo sul tablet.

![](logo/logo-letter.png)
![](logo/logo-full.png)
![](logo/logo-all-letters.png)

### Creazione avatar utenti
Abbiamo creato due avatar che saranno usati come le immagini profilo per gli utenti che hanno lasciato un review per il nostro prodotto.

![](avatars/avatar1.png)
![](avatars/avatar2.png)

### Prodotti simili
Immagini di altri prodotti simili.

![](similar-products/tablet1.png)
![](similar-products/tablet2.png)
![](similar-products/tablet3.png)

### Creazione modello in Blender
//


### Caricamento del modello sulla pagina
Abbiamo esportato il modello fatto in Blender come un file Wavefront (.obj). Da ciò poi abbiamo incluso i loader OBJLoader2 e LoadingSupport.js nella nostra scena. 

Il modello è diviso in 4 parti, lo schermo, la cornice, il logo e la scocca.
Dopodichè abbiamo caricato il tablet nel container apposito sulla interfaccia, abbiamo fatto una prova semplice con i cambiamenti dei colori dei 4 parti.
![](images/tablet-colors1.png)
